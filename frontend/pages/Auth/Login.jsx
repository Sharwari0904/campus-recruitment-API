import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        userType === "STUDENT" ? "/auth/student-login" : "/auth/user-login";

      const payload =
        userType === "STUDENT"
          ? { email: usernameOrEmail.trim(), password: password.trim() }
          : { username: usernameOrEmail.trim(), password: password.trim() };

      const res = await api.post(endpoint, payload);
      const user = res.data;

      if (!user) throw new Error("Invalid credentials");

      localStorage.setItem(userType.toLowerCase(), JSON.stringify(user));
      navigate(userType === "STUDENT" ? "/student" : "/admin");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleclick = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen
                    bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-3xl
                   shadow-2xl border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* User Type */}
        <label className="block mb-1 font-medium">Login as</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>

        {/* Username / Email */}
        <label className="block mb-1 font-medium">
          {userType === "STUDENT" ? "Email" : "Username"}
        </label>
        <input
          type="text"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Password */}
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold
            transition-all duration-300
            ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={handleclick}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
