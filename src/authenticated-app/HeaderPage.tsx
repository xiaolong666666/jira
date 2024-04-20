import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "context/auth-provider";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { resetRoute } from "utils";
import { Header, HeaderLeft, HeaderRight } from "./style";
import ProjectPopover from "components/project-popover";
import { ButtonNotPadding } from "components/lib";

const User = () => {
  const { user, logout } = useAuth();

  return (
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
  );
};

function HeaderPage({
  setProjectModalVisible,
}: {
  setProjectModalVisible: (isOpen: boolean) => void;
}) {
  return (
    <Header between>
      <HeaderLeft gap>
        <ButtonNotPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </ButtonNotPadding>
        <ProjectPopover setProjectModalVisible={setProjectModalVisible} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
}

export default HeaderPage;
