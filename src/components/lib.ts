import styled from "@emotion/styled";

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
