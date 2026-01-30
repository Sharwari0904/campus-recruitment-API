import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove logged-in student from localStorage
    localStorage.removeItem("student");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-100 via-indigo-100 to-blue-100 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10 
                      bg-linear-to-r from-indigo-600 to-violet-600
                      text-white px-8 py-5 rounded-2xl shadow-lg">
        
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold tracking-wide drop-shadow-sm">
          Student Dashboard
        </h1>

        {/* Buttons Group */}
        <div className="flex gap-4">
          <Link
            to="profile"
            className="px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 
                       text-white rounded-xl font-medium shadow-md 
                       hover:bg-white/30 hover:shadow-xl transition-all duration-300"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 
                       text-white rounded-xl font-medium shadow-md 
                       hover:bg-white/30 hover:shadow-xl transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex gap-5 mb-10">
        {[ 
          { to: "jobs", label: "Jobs" },
          { to: "applications", label: "Applications" },
          { to: "interviews", label: "Interviews" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="px-5 py-3 bg-white/40 backdrop-blur-lg border border-white/60 
                       rounded-xl text-slate-700 font-medium shadow-md 
                       hover:bg-white/70 hover:shadow-xl hover:text-indigo-700 
                       transition-all duration-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Content Container */}
      <div className="rounded-2xl bg-white p-8 shadow-xl border border-indigo-100 bg-opacity-90 backdrop-blur-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
