import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
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
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render: (_: any, projects: { personId: string }) => (
        <span>
          {user.find((u) => u.id === projects.personId)?.name || "未知"}
        </span>
      ),
    },
    {
      title: "创建时间",
      render: (_: any, projects: { created: number }) => (
        <span>
          {projects.created
            ? dayjs(projects.created).format("YYYY-MM-DD")
            : "无"}
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={list} pagination={false} />;
};

export default List;
