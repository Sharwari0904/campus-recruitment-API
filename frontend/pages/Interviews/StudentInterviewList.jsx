import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentInterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    let mounted = true;

    const fetchInterviews = async () => {
      try {
        const res = await api.get("/interviews/allInterviews");

        // filter interviews for logged-in student
        const filtered = (res.data || []).filter(
          (interview) => interview.studentId === student?.id
        );

        if (mounted) setInterviews(filtered);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load interviews"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (student?.id) {
      fetchInterviews();
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading interviews...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">My Interviews</h2>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Application ID</th>
            <th className="p-2">Company Name</th>
            <th className="p-2">Interview Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {interviews.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No interviews found
              </td>
            </tr>
          ) : (
            interviews.map((i) => (
              <tr key={i.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{i.jobApplicationId}</td>
                <td className="p-2">{i.companyName}</td>
                <td className="p-2">
                  {new Date(i.interviewDate).toLocaleDateString()}
                </td>
                <td className="p-2 font-medium">{i.interviewStatus}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentInterviewList;
