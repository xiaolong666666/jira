import { useState, useEffect } from "react";
import { cleanObject } from "../../utils";
import { useMount, useDebounce, useHttp } from "../../utils/hooks";
import SearchPanel from "./search-panel";
import List from "./list";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [user, setUser] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 2000);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [client, debounceParam]);

  useMount(() => {
    client("users").then(setUser);
  });

  return (
    <>
      <SearchPanel param={param} setParam={setParam} user={user} />
      <List list={list} user={user} />
    </>
  );
};

export default ProjectListScreen;
