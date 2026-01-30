import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    department: "",
    graduationYear: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/students/register", data);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen
                    bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <form
        onSubmit={register}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl
                   backdrop-blur-sm border border-white/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Register
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {/* Name */}
        <label className="block mb-2 font-medium">Name</label>
        <input
          className="w-full p-3 mb-4 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your name"
          required
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        {/* Email */}
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          className="w-full p-3 mb-4 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your email"
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        {/* Password */}
        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          className="w-full p-3 mb-4 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter password"
          required
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        {/* Contact Number */}
        <label className="block mb-2 font-medium">Contact Number</label>
        <input
          className="w-full p-3 mb-4 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter contact number"
          required
          onChange={(e) =>
            setData({ ...data, contactNumber: e.target.value })
          }
        />

        {/* Department */}
        <label className="block mb-2 font-medium">Department</label>
        <input
          className="w-full p-3 mb-4 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter department"
          required
          onChange={(e) =>
            setData({ ...data, department: e.target.value })
          }
        />

        {/* Graduation Year */}
        <label className="block mb-2 font-medium">Graduation Year</label>
        <input
          className="w-full p-3 mb-6 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter graduation year"
          required
          onChange={(e) =>
            setData({ ...data, graduationYear: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold
            ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
