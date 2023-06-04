import { Form, Input } from "antd";
import { useAuth } from "context/auth-provider";
import { useRequest } from "utils/hooks";
import { LoginButton } from "./style";

interface Props {
  onError: (error: Error) => void;
}

const RegisterScreen = ({ onError }: Props) => {
  const { register } = useAuth();
  const { run, isLoading } = useRequest(undefined, { throwOnError: true });

  const onHandleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password)
      return onError(new Error("请保持两次密码输入一致"));
    try {
      await run(register(values));
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LoginButton htmlType="submit" type="primary" loading={isLoading}>
          注册
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
