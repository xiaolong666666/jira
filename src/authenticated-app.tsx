import ProjectList from "./screens/project-list";
import { useAuth } from "context/auth-provider";

const AuthEnticatedAPP = () => {
  const { logout } = useAuth();
  return (
    <>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </>
  );
};

export default AuthEnticatedAPP;
