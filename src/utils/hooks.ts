import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { URLSearchParamsInit } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuth } from "context/auth-provider";
import { http } from "./http";
import { cleanObject } from "./index";
import { User } from "screens/project-list/search-panel";
import { Project } from "screens/project-list/list";

export const useMount = (callback: () => void) => {
  useEffect(
    useCallback(() => {
      callback();
    }, [callback]),
    []
  );
};

export const useDebounce = <T>(param: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(param);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(param), delay);
    return () => clearTimeout(timer);
  }, [param, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [array, setArray] = useState(initialArray);

  const clear = () => setArray([]);

  const add = (value: T) => {
    setArray([...array, value]);
  };

  const removeIndex = (index: number) => {
    let newArray = array.filter((_: T, i: number) => i !== index);
    setArray(newArray);
  };

  return [array, clear, removeIndex, add] as const;
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endPoint, config]: Parameters<typeof http>) =>
      http(endPoint, { token: user?.token, ...config }),
    [user?.token]
  );
};

interface RequestProps<T> {
  status?: "init" | "loading" | "success" | "error";
  data?: T | null;
  error?: Error | null;
}

interface RequestConfigProps {
  throwOnError: boolean;
}

const initialRequestData = {
  status: "init",
  data: null,
  error: null,
};

const initialRequestConfig = {
  throwOnError: false,
};

export const useRequest = <T>(
  initData?: RequestProps<T>,
  initConfig?: RequestConfigProps
) => {
  const config = { ...initialRequestConfig, ...initConfig };
  const [state, setState] = useState<RequestProps<T>>({
    ...initialRequestData,
    ...initData,
    status: "init",
  });
  const [retry, setRetry] = useState(() => () => {});
  const mountRef = useMountRef();

  const onSuccess = useCallback(
    (data: T) =>
      setState({
        data,
        status: "success",
        error: null,
      }),
    []
  );

  const onError = useCallback(
    (error: Error) =>
      setState({
        error,
        status: "error",
        data: null,
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      if (runConfig?.retry) {
        setRetry(() => () => run(runConfig?.retry(), runConfig));
      }
      setState((prevState) => ({ ...prevState, status: "loading" }));
      return promise
        .then((data: T) => {
          mountRef.current && onSuccess(data);
          return data;
        })
        .catch((error) => {
          onError(error);
          return config.throwOnError ? Promise.reject(error) : error;
        });
    },
    [config.throwOnError, mountRef, onError, onSuccess]
  );

  return {
    isInit: state.status === "init",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
    onSuccess,
    onError,
    retry,
    ...state,
    setState,
  };
};

export const useProjects = <Project>(params?: Partial<Project>) => {
  const { run, ...result } = useRequest<Project[]>();
  const client = useHttp();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [client, params]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [client, fetchProjects, run]);

  return result;
};

export const useEditProjects = () => {
  const { run, ...restResult } = useRequest();
  const client = useHttp();
  const mutate = (params: Partial<Project>) =>
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );

  return {
    mutate,
    ...restResult,
  };
};

export const useAddProjects = () => {
  const { run, ...restResult } = useRequest();
  const client = useHttp();
  const mutate = (params: Partial<Project>) =>
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  return {
    mutate,
    ...restResult,
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnMount: boolean = false
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  });

  useEffect(
    () => () => {
      if (!keepOnUnMount) document.title = oldTitle;
    },
    [keepOnUnMount, oldTitle]
  );
};

export const useUser = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};

export const useUrlQueryParams = <T extends string>(keys: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        stateKeys.reduce(
          (prev, key) => ({ ...prev, [key]: searchParams.get(key) || "" }),
          {} as { [key in T]: string }
        ),
      [stateKeys, searchParams]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      let o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};

export const useMountRef = () => {
  const mountRef = useRef(false);

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  });

  return mountRef;
};
