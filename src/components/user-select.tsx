import React from "react";
import { useUser } from "utils/hooks";
import { IdSelect } from "./id-select";

export default function UserSelect(
  props: React.ComponentProps<typeof IdSelect>
) {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props} />;
}
