import { Form, Input } from "antd";
import { useAuth } from "context/auth-provider";
import { LoginButton } from "./style";

const RegisterScreen = () => {
  const { register } = useAuth();

  const onHandleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    <Form onFinish={onHandleSubmit}>
      <Form.Item name="username">
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name="password">
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LoginButton htmlType="submit" type="primary">
          注册
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
