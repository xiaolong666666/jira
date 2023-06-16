import { useMemo } from "react";
import { useUrlQueryParams } from "utils/hooks";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(["name", "personId"]);
  const params = useMemo(
    () => ({ ...param, personId: Number(param.personId) || undefined }),
    [param]
  ); // personId 要求number类型，从url中默认获取的是string类型，需要转换
  return [params, setParam] as const;
};
