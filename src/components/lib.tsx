import { Spin, Typography } from "antd";
import styled from "@emotion/styled";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ between }) => (between ? "space-between" : undefined)};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}rem`};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${({ gap }) =>
      typeof gap === "number" ? `${gap}rem` : gap ? "2rem" : undefined};
  }
`;

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullLoading = () => (
  <FullPage>
    <Spin size="large" tip="Loading" />
  </FullPage>
);

export const FullPageErrorCallback = ({
  error,
}: {
  error: Error | null | undefined;
}) => (
  <FullPage>
    <DevTools />
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
);
