/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "context/auth-provider";
import { http } from "./http";
import { cleanObject } from "./index";

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
    []
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

  const onSuccess = (data: T) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const onError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, status: "loading" });
    return promise
      .then((data: T) => {
        onSuccess(data);
        return data;
      })
      .catch((error) => {
        onError(error);
        return config.throwOnError ? Promise.reject(error) : error;
      });
  };

  return {
    isInit: state.status === "init",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
    onSuccess,
    onError,
    ...state,
    setState,
  };
};

export const useProjects = <Project>(params?: Partial<Project>) => {
  const { run, ...result } = useRequest<Project[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
  }, [client, params]);

  return result;
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
    [keepOnUnMount]
  );
};
