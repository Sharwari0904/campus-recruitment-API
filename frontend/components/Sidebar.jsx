import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive 
      ? "bg-blue-600 text-white shadow-md" 
      : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm p-6">
      {/* Logo Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">CampusRecruit</h1>
        <p className="text-gray-500 text-sm">Admin Panel</p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        <NavLink to="/students" className={linkClass}>
          Students
        </NavLink>

        <NavLink to="/jobs" className={linkClass}>
          Job Postings
        </NavLink>

        <NavLink to="/applications" className={linkClass}>
          Applications
        </NavLink>

        <NavLink to="/interviews" className={linkClass}>
          Interviews
        </NavLink>
      </nav>
    </aside>
  );
}
