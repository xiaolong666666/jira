import { FormEvent } from "react";
import { API_URL } from "../../constants";

interface loginParams {
  username: string;
  password: string;
}

const LoginScreen = () => {
  const login = (params: loginParams) => {
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    }).then(async (resopnse) => {
      if (resopnse.ok) {
      }
    });
  };

  const onHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({
      username,
      password,
    });
  };
  return (
    <form onSubmit={onHandleSubmit}>
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
    </form>
  );
};

export default LoginScreen;
