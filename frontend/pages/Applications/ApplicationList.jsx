import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/jobApplication/all");
        setApplications(res.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Delete application
  const deleteApplication = async (id) => {
    try {
      await api.delete(`/jobApplication/delete/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
      alert("Application deleted successfully");
    } catch (err) {
      alert("Failed to delete application");
    }
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Job Applications</h2>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left border-b bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Student Name</th>
            <th className="p-2">Student ID</th>
            <th className="p-2">Company</th>
            <th className="p-2">Job Posting ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 && (
            <tr>
              <td colSpan="7" className="p-3 text-center text-gray-600">
                No applications found
              </td>
            </tr>
          )}

          {applications.map((a) => (
            <tr key={a.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{a.id}</td>
              <td className="p-2">{a.studentName}</td>
              <td className="p-2">{a.studentId}</td>
              <td className="p-2">{a.companyName}</td>
              <td className="p-2">{a.jobPostingId}</td>

              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    a.status === "APPROVED"
                      ? "bg-green-600"
                      : a.status === "REJECTED"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {a.status}
                </span>
              </td>

              <td className="p-2">
                <button
                  className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                  onClick={() => deleteApplication(a.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
