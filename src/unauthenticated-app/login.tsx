import { Form, Input } from "antd";
import { useAuth } from "context/auth-provider";
import { useRequest } from "utils/hooks";
import { LoginButton } from "./style";

interface Props {
  onError: (error: Error) => void;
}

const LoginScreen = ({ onError }: Props) => {
  const { login } = useAuth();
  const { run, isLoading } = useRequest(undefined, { throwOnError: true });

  const onHandleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error) {
      onError(error as Error);
    }
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
        <LoginButton htmlType="submit" type="primary" loading={isLoading}>
          登录
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
