import { useState, useEffect } from "react";
import { cleanObject } from "../../utils";
import { useMount, useDebounce, useHttp } from "../../utils/hooks";
import SearchPanel from "./search-panel";
import List from "./list";
import { Container } from "./style";

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
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} user={user} />
      <List list={list} user={user} />
    </Container>
  );
};

export default ProjectListScreen;
