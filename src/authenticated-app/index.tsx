import { Dropdown, Menu, Button } from "antd";
import ProjectList from "screens/project-list";
import { useAuth } from "context/auth-provider";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Header, HeaderLeft, HeaderRight, Main } from "./style";

const AuthEnticatedAPP = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <Header between>
        <HeaderLeft gap>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button type="link" onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link" onClick={(e) => e.preventDefault()}>
              Hi,{user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </>
  );
};

export default AuthEnticatedAPP;
