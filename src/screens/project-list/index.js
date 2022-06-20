import { useState, useEffect } from "react";
import qs from "qs";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;
console.log("apiUrl", apiUrl);

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [user, setUser] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?&${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUser(await response.json());
      }
    });
  }, [param]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} user={user} />
      <List list={list} user={user} />
    </div>
  );
};

export default ProjectListScreen;
