import { FormEvent } from "react";
import { useAuth } from "context/auth-provider";

const LoginScreen = () => {
  const { user, register, login, logout } = useAuth();
  console.log("test cwl");

  const onHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={onHandleSubmit}>
      {user ? <div>登录成功，用户名：{user?.name}</div> : null}
      <>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </>
      <>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </>
      <>
        <button type="submit">登录</button>
      </>
      <button onClick={logout}>退出</button>
    </form>
  );
};

export default LoginScreen;
