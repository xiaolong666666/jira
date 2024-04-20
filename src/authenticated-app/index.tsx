import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Routes, Route } from "react-router";
import ProjectList from "screens/project-list";
import Project from "screens/project";
import { useDocumentTitle } from "utils/hooks";
import HeaderPage from "./HeaderPage";
import { Main } from "./style";
import { useState } from "react";
import ProjectModalScreen from "screens/project-list/project-modal";

const AuthEnticatedAPP = () => {
  useDocumentTitle("项目列表");
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  return (
    <>
      <HeaderPage setProjectModalVisible={setProjectModalVisible} />
      <Main>
        <Router>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectList setProjectModalVisible={setProjectModalVisible} />
              }
            />
            <Route path="/projects/:projectId/*" element={<Project />} />
            <Route
              path="*"
              element={<Navigate to="/projects" replace={true} />}
            />
          </Routes>
        </Router>
        <ProjectModalScreen
          open={projectModalVisible}
          onClose={() => setProjectModalVisible(false)}
        />
      </Main>
    </>
  );
};

export default AuthEnticatedAPP;
