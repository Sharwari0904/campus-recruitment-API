import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  // Get both student and admin from localStorage
  const student = JSON.parse(localStorage.getItem("student"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  let user = null;

  if (student && allowedRoles.includes("STUDENT")) user = student;
  else if (admin && allowedRoles.includes("ADMIN")) user = admin;

  // If no user or role not allowed, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
