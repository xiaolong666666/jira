import { Form, Input, Select } from "antd";
import { Project } from "./list";
import UserSelect from "../../components/user-select";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  param: Partial<Pick<Project, "name" | "personId">>;
  user: User[];
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, user, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(personId: number | undefined) => {
            setParam({
              ...param,
              personId,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
