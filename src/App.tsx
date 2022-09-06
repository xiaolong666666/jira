import UnAuthEnticatedAPP from "./unauthenticated-app";
import AuthEnticatedAPP from "./authenticated-app";
import { useAuth } from "context/auth-provider";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthEnticatedAPP /> : <UnAuthEnticatedAPP />}
    </div>
  );
}

export default App;
