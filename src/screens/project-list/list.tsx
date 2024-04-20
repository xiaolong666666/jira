import { Menu, Dropdown, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./search-panel";
import { useEditProjects } from "utils/hooks";
import Pin from "components/pin";
import { ButtonNotPadding } from "components/lib";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  user: User[];
  refresh: () => void;
  setProjectModalVisible: (isOpen: boolean) => void;
}

export const List = ({
  user,
  refresh,
  setProjectModalVisible,
  ...tableProps
}: ListProps) => {
  const { mutate } = useEditProjects();
  // 柯理化处理（id先拿到, pin onChange时才能确定）
  const onSwitchPin = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);
  const columns = [
    {
      title: <Pin count={1} checked disabled />,
      render: (_: any, record: Project) => (
        <Pin checked={record.pin} onCheckedChange={onSwitchPin(record.id)} />
      ),
    },
    {
      title: "项目名称",
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
      render: (_: any, record: Project) => (
        <Link to={String(record.id)}>{record.name}</Link>
      ),
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render: (_: any, projects: { personId: number }) => (
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
    {
      title: "操作",
      render: (_: any, projects: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <ButtonNotPadding
                  type="link"
                  onClick={() => setProjectModalVisible(true)}
                >
                  编辑
                </ButtonNotPadding>
              </Menu.Item>
            </Menu>
          }
        >
          <ButtonNotPadding type="link">...</ButtonNotPadding>
        </Dropdown>
      ),
    },
  ];

  return <Table columns={columns} pagination={false} {...tableProps} />;
};

export default List;
