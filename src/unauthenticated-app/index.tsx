import { useState } from "react";
import { Divider } from "antd";
import Login from "./login";
import Register from "./register";
import { Container, ShadowCard, Header, BackGround, Title } from "./style";

const UnAuthEnticatedAPP = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Container>
      <Header />
      <BackGround />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {isRegister ? <Register /> : <Login />}
        <Divider />
        <a href="javascipt:void(0)" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已有账号？点击登录" : "未有账号？点击注册"}
        </a>
      </ShadowCard>
    </Container>
  );
};

export default UnAuthEnticatedAPP;
