import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  orangization: string;
}

interface ListProps {
  list: Project[];
  user: User[];
}

export const List = ({ list, user }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>项目名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                {user.find((u) => u.id === item.personId)?.name || "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
