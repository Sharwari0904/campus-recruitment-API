import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import AddInterview from "./AddInterview";

export default function InterviewList() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);

  // Fetch all interviews
  useEffect(() => {
    let mounted = true;
    const fetchInterviews = async () => {
      try {
        const res = await api.get("/interviews/allInterviews");
        if (mounted) setInterviews(res.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load interview data"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchInterviews();
    return () => (mounted = false);
  }, []);

  // Delete interview
  const deleteInterview = async (id) => {
    try {
      await api.delete(`/interviews/cancelInterview/${id}`);
      setInterviews((prev) => prev.filter((i) => i.id !== id));
      alert("Interview deleted successfully");
    } catch {
      alert("Failed to delete interview");
    }
  };

  // Add or update interview in list
  const handleAddOrEditSuccess = (savedInterview) => {
    setInterviews((prev) => {
      const exists = prev.find((i) => i.id === savedInterview.id);
      return exists
        ? prev.map((i) => (i.id === savedInterview.id ? savedInterview : i))
        : [...prev, savedInterview];
    });
    setShowAddModal(false);
    setEditingInterview(null);
  };

  if (loading) return <div>Loading interviews...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Interviews</h2>
        <button
          className="px-3 py-1 border rounded bg-blue-600 text-white"
          onClick={() => setShowAddModal(true)}
        >
          Add Interview
        </button>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Student ID</th>
            <th className="p-2">Job Application ID</th>
            <th className="p-2">Interview Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {interviews.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No interviews found
              </td>
            </tr>
          ) : (
            interviews.map((i) => (
              <tr key={i.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{i.id}</td>
                <td className="p-2">{i.studentId}</td>
                <td className="p-2">{i.jobApplicationId}</td>
                <td className="p-2">
                  {i.interviewDate
                    ? i.interviewDate.split("-").reverse().join("/")
                    : "N/A"}
                </td>
                <td className="p-2">{i.interviewStatus}</td>
                <td className="p-2">
                  <button
                    className="mr-2 px-2 py-1 border rounded"
                    onClick={() => setEditingInterview(i)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 border rounded text-red-600"
                    onClick={() => deleteInterview(i.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add / Edit Interview Modal */}
      {(showAddModal || editingInterview) && (
        <AddInterview
          interview={editingInterview} // null → add, object → edit
          onClose={() => {
            setShowAddModal(false);
            setEditingInterview(null);
          }}
          onSuccess={handleAddOrEditSuccess}
        />
      )}
    </div>
  );
}
