import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJobId, setEditingJobId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [newJob, setNewJob] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobLocation: "",
    eligibilityCriteria: "",
  });

  // Fetch all jobs
  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      try {
        const res = await api.get("/job-postings/allJobs");
        if (mounted) setJobs(res.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to load jobs"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => (mounted = false);
  }, []);

  // Delete job
  const deleteJob = async (id) => {
    try {
      await api.delete(`/job-postings/deleteJob/${id}`);
      alert("Job deleted successfully");
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch {
      alert("Failed to delete job");
    }
  };

  // Start editing a job
  const startEditingJob = (job) => {
    setEditingJobId(job.id);
    setNewJob({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      jobDescription: job.jobDescription,
      jobLocation: job.jobLocation,
      eligibilityCriteria: job.eligibilityCriteria,
    });
    setShowForm(true);
  };

  // Save changes (add or edit)
  const handleSave = async () => {
    const {
      jobTitle,
      companyName,
      jobDescription,
      jobLocation,
      eligibilityCriteria,
    } = newJob;

    if (
      !jobTitle ||
      !companyName ||
      !jobDescription ||
      !jobLocation ||
      !eligibilityCriteria
    ) {
      alert("All fields are required");
      return;
    }

    try {
      if (editingJobId) {
        // Update existing job
        await api.put("/job-postings/updateJob", { id: editingJobId, ...newJob });
        alert("Job updated successfully");
        setJobs((prev) =>
          prev.map((job) =>
            job.id === editingJobId ? { id: editingJobId, ...newJob } : job
          )
        );
      } else {
        // Add new job
        const res = await api.post("/job-postings/createJob", newJob);
        alert("New job added");
        setJobs((prev) => [...prev, res.data]);
      }

      // Reset form
      setNewJob({
        jobTitle: "",
        companyName: "",
        jobDescription: "",
        jobLocation: "",
        eligibilityCriteria: "",
      });
      setEditingJobId(null);
      setShowForm(false);
    } catch (err) {
      alert("Failed to save job");
    }
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => {
            setShowForm(true);
            setEditingJobId(null);
            setNewJob({
              jobTitle: "",
              companyName: "",
              jobDescription: "",
              jobLocation: "",
              eligibilityCriteria: "",
            });
          }}
        >
          Add Job
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            {editingJobId ? "Edit Job" : "Add Job"}
          </h3>

          <div className="flex flex-col gap-3 mb-3">
            <input
              type="text"
              placeholder="Job Title"
              className="border p-2 rounded"
              value={newJob.jobTitle}
              onChange={(e) =>
                setNewJob({ ...newJob, jobTitle: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Company Name"
              className="border p-2 rounded"
              value={newJob.companyName}
              onChange={(e) =>
                setNewJob({ ...newJob, companyName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Job Description"
              className="border p-2 rounded"
              value={newJob.jobDescription}
              onChange={(e) =>
                setNewJob({ ...newJob, jobDescription: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Job Location"
              className="border p-2 rounded"
              value={newJob.jobLocation}
              onChange={(e) =>
                setNewJob({ ...newJob, jobLocation: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Eligibility Criteria"
              className="border p-2 rounded"
              value={newJob.eligibilityCriteria}
              onChange={(e) =>
                setNewJob({ ...newJob, eligibilityCriteria: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Job Title</th>
            <th className="p-2">Company</th>
            <th className="p-2">Description</th>
            <th className="p-2">Location</th>
            <th className="p-2">Eligibility</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{job.id}</td>
              <td className="p-2">{job.jobTitle}</td>
              <td className="p-2">{job.companyName}</td>
              <td className="p-2">{job.jobDescription}</td>
              <td className="p-2">{job.jobLocation}</td>
              <td className="p-2">{job.eligibilityCriteria}</td>
              <td className="p-2">
                <button
                  className="mr-2 px-2 py-1 border rounded"
                  onClick={() => startEditingJob(job)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 border rounded text-red-600"
                  onClick={() => deleteJob(job.id)}
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
