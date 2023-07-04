import React from "react";
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: PinProps["checked"]) => void;
}

const Pin: React.FC<PinProps> = ({
  checked,
  onCheckedChange,
  ...restProps
}) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};

export default Pin;
