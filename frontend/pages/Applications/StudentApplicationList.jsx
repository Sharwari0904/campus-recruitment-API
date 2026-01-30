import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    let mounted = true;

    const fetchApplications = async () => {
      try {
        const res = await api.get(
          `/jobApplication/student/${student.id}`
        );
        if (mounted) {
          setApplications(res.data || []);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load applications"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (student?.id) {
      fetchApplications();
    }

    return () => (mounted = false);
  }, [student?.id]);

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">My Applications</h2>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Company Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Applied Date</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No applications found
              </td>
            </tr>
          ) : (
            applications.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{a.companyName}</td>
                <td className="p-2">{a.status}</td>
                <td className="p-2">
                  {new Date(a.appliedAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentApplicationList;
