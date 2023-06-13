import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Routes, Route } from "react-router";
import ProjectList from "screens/project-list";
import Project from "screens/project";
import { useDocumentTitle } from "utils/hooks";
import HeaderPage from "./HeaderPage";
import { Main } from "./style";

const AuthEnticatedAPP = () => {
  useDocumentTitle("项目列表");

  return (
    <>
      <HeaderPage />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId/*" element={<Project />} />
            <Route
              path="*"
              element={<Navigate to="/projects" replace={true} />}
            />
          </Routes>
        </Router>
      </Main>
    </>
  );
};

export default AuthEnticatedAPP;
