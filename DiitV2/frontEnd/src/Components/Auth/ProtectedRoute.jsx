import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * @param {ReactNode} children - Wrapped route
 * @param {string} role - "admin" | "student"
 * @param {string} fallback - fallback redirect path
 */
const ProtectedRoute = ({ children, role = "admin", fallback = "/" }) => {
  const location = useLocation();
  const token = localStorage.getItem(role === "admin" ? "aToken" : "sToken");

  if (!token) {
    return <Navigate to={fallback} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
