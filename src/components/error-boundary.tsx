import React, { Component } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export default class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 子组件抛出错误，该方法会接收到并调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { children, fallbackRender } = this.props;
    const { error } = this.state;
    if (error) return fallbackRender({ error });
    return children;
  }
}
