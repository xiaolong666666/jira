import React from "react";
import { List, Popover, Typography, Divider } from "antd";
import { useProjects } from "utils/hooks";
import styled from "@emotion/styled";
import { ButtonNotPadding } from "./lib";

const ProjectPopover = ({
  setProjectModalVisible,
}: {
  setProjectModalVisible: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project: any) => project.pin);
  const content = (
    <PopoverContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((projects: any) => (
          <List.Item>
            <List.Item.Meta title={projects.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNotPadding
        type="link"
        onClick={() => setProjectModalVisible(true)}
      >
        创建项目
      </ButtonNotPadding>
    </PopoverContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

export default ProjectPopover;

const PopoverContainer = styled.div`
  min-width: 30rem;
`;
