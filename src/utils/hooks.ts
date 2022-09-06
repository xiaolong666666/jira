/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "context/auth-provider";
import { useState, useEffect, useCallback } from "react";
import { http } from "./http";

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
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { token: user?.token, ...config });
};
