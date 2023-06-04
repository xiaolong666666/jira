import UnAuthEnticatedAPP from "./unauthenticated-app";
import AuthEnticatedAPP from "./authenticated-app";
import { useAuth } from "context/auth-provider";
import ErrorBoundary from "./components/error-boundary";
import { FullPageErrorCallback } from "./components/lib";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorCallback}>
        {user ? <AuthEnticatedAPP /> : <UnAuthEnticatedAPP />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
