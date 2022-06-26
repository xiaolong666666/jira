import { useState, useEffect } from "react";
import qs from "qs";
import { API_URL } from "../../constants";
import { cleanObject } from "../../utils";
import { useMount, useDebounce } from "../../utils/hooks";
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

  useEffect(() => {
    fetch(
      `${API_URL}/projects?&${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${API_URL}/users`).then(async (response) => {
      if (response.ok) {
        setUser(await response.json());
      }
    });
  });

  return (
    <>
      <SearchPanel param={param} setParam={setParam} user={user} />
      <List list={list} user={user} />
    </>
  );
};

export default ProjectListScreen;
