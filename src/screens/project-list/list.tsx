import { Table } from "antd";
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
  const columns = [
    {
      title: "项目名称",
      dataIndex: "name",
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "负责人",
      render: (_: any, projects: { personId: string }) => (
        <span>
          {user.find((u) => u.id === projects.personId)?.name || "未知"}
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={list} pagination={false} />;
};

export default List;
