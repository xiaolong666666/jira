import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "context/auth-provider";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { resetRoute } from "utils";
import { Header, HeaderLeft, HeaderRight } from "./style";

function HeaderPage() {
  const { user, logout } = useAuth();
  return (
    <Header between>
      <HeaderLeft gap>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </Button>
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
  );
}

export default HeaderPage;
