import { Form, Input, Select } from "antd";
export interface User {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
  token: string;
}

interface SearchPanelProps {
  param: {
    name: string;
    personId: string;
  };
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
        <Select
          value={param.personId}
          onChange={(personId: string) => {
            setParam({
              ...param,
              personId,
            });
          }}
        >
          <Select.Option value="">负责人</Select.Option>
          {user.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
