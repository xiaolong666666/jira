import { useState } from "react";
import Login from "./login";
import Register from "./register";

const UnAuthEnticatedAPP = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </>
  );
};

export default UnAuthEnticatedAPP;
