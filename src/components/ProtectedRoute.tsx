import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  // If token exists, render the child routes (AdminDashboard)
  return <Outlet />;
};

export default ProtectedRoute;