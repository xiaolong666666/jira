/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";

export const useMount = (callback) => {
  useEffect(
    useCallback(() => {
      callback();
    }, [callback]),
    []
  );
};

export const useDebounce = (param, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(param);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(param), delay);
    return () => clearTimeout(timer);
  }, [param, delay]);

  return debouncedValue;
};
