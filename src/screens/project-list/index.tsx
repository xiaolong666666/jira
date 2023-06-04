import { useState } from "react";
import { Typography } from "antd";
import { useMount, useDebounce, useHttp, useProjects } from "../../utils/hooks";
import SearchPanel from "./search-panel";
import List, { Project } from "./list";
import { Container } from "./style";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [user, setUser] = useState([]);
  const debounceParam = useDebounce(param, 2000);
  const client = useHttp();
  const { data: list, isLoading, error } = useProjects<Project>(debounceParam);

  useMount(() => {
    client("users").then(setUser);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} user={user} />
      {error && (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      )}
      <List loading={isLoading} dataSource={list || []} user={user} />
    </Container>
  );
};

export default ProjectListScreen;
