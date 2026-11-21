import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.jsx"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage.jsx"));
const UsersPage = lazy(() => import("./pages/UsersPage.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}