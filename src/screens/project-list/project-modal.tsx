import React from "react";
import { Drawer, DrawerProps } from "antd";

// type Props = DrawerProps & {

// }

type Props = React.ComponentProps<typeof Drawer> & {};

const ProjectModalScreen: React.FC<Props> = ({ ...rest }) => {
  return <Drawer title="项目Modal" width="100vw" {...rest}></Drawer>;
};

export default ProjectModalScreen;
