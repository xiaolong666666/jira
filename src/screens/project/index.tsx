import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import KanBanScreen from "screens/kanban";
import TaskGroupScreen from "screens/task-group";

const ProjectScreen = () => {
  return (
    <>
      <div>ProjectScreen</div>
      <Link to="kanban">看板</Link>
      <Link to="task-group">任务组</Link>
      <Routes>
        <Route path="kanban" element={<KanBanScreen />} />
        <Route path="task-group" element={<TaskGroupScreen />} />
        <Route
          path="*"
          element={
            <Navigate
              to={`${window.location.pathname}/kanban`}
              replace={true}
            />
          }
        />
      </Routes>
    </>
  );
};

export default ProjectScreen;
