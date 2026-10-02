import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function ProtectedRoute() {
  const { currentUser } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}