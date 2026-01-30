import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        // 1️⃣ Fetch all jobs
        const jobsRes = await api.get("/job-postings/allJobs");

        // 2️⃣ Fetch all applications
        const appsRes = await api.get("/jobApplication/all");

        if (!mounted) return;

        setJobs(jobsRes.data || []);

        // 3️⃣ Get job IDs already applied by this student
        const appliedJobIds = (appsRes.data || [])
          .filter((app) => app.studentId === student.id)
          .map((app) => app.jobPostingId);

        setAppliedJobs(appliedJobIds);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, [student.id]);

  const applyJob = async (jobPostingId) => {
    try {
      await api.post("/jobApplication/apply", {
        studentId: student.id,
        jobPostingId,
      });

      alert("Applied successfully");

      // update UI immediately
      setAppliedJobs((prev) => [...prev, jobPostingId]);
    } catch (err) {
      alert("Failed to apply");
    }
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>

      <table className="w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => {
            const alreadyApplied = appliedJobs.includes(job.id);

            return (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{job.id}</td>
                <td className="p-2">{job.jobTitle}</td>
                <td className="p-2">{job.jobDescription}</td>
                <td className="p-2">
                  <button
                    onClick={() => applyJob(job.id)}
                    disabled={alreadyApplied}
                    className={`px-3 py-1 rounded border font-medium
                      ${
                        alreadyApplied
                          ? "text-gray-500 cursor-not-allowed bg-gray-100"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                  >
                    {alreadyApplied ? "Applied" : "Apply"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentJobList;
