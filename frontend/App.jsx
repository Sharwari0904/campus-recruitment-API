import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";

// Admin Pages
import Dashboard from "./pages/Dashboard/Home";
import StudentList from "./pages/Students/StudentList";
import JobList from "./pages/Jobs/JobList";
import ApplicationList from "./pages/Applications/ApplicationList";
import InterviewList from "./pages/Interviews/InterviewList";

// Student Pages
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import StudentJobList from "./pages/Jobs/StudentJobList";
import StudentApplicationList from "./pages/Applications/StudentApplicationList";
import StudentInterviewList from "./pages/Interviews/StudentInterviewList";

import ProtectedRoute from "./components/ProtectedRoute";
import StudentProfile from "./pages/Students/StudentProfile";
import Register from "./components/Register";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="students" replace />} />
          <Route path="students" element={<StudentList />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="applications" element={<ApplicationList />} />
          <Route path="interviews" element={<InterviewList />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<StudentProfile />}/>
          <Route index element={<Navigate to="jobs" replace />} />
          <Route path="jobs" element={<StudentJobList />} />
          <Route path="applications" element={<StudentApplicationList />} />
          <Route path="interviews" element={<StudentInterviewList />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
