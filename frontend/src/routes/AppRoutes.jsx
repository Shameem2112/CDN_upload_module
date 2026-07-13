import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import Files from "../pages/Files";
import Profile from "../pages/Profile";
import EditFile from "../pages/EditFile";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="upload" element={<Upload />} />

        <Route path="files" element={<Files />} />

        <Route path="profile" element={<Profile />} />
        <Route path="files/:id/edit" element={<EditFile />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;