import { Form, Input } from "antd";
import { useAuth } from "context/auth-provider";
import { LoginButton } from "./style";

const LoginScreen = () => {
  const { login } = useAuth();

  const onHandleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={onHandleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LoginButton htmlType="submit" type="primary">
          登录
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
