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
    <Form>
      <Input
        type="text"
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      />
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
    </Form>
  );
};

export default SearchPanel;
