import { useState } from "react";
import { Divider, Button, Typography } from "antd";
import Login from "./login";
import Register from "./register";
import { Container, ShadowCard, Header, BackGround, Title } from "./style";

const UnAuthEnticatedAPP = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Container>
      <Header />
      <BackGround />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {error && (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        )}
        {isRegister ? (
          <Register onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <Divider />
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已有账号？点击登录" : "未有账号？点击注册"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export default UnAuthEnticatedAPP;
