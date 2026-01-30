import React, { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AddInterview({ onClose, onSuccess, interview }) {
  const isEdit = Boolean(interview?.id);

  const [form, setForm] = useState({
    studentId: "",
    jobApplicationId: "",
    interviewDate: "",
    interviewStatus: "SCHEDULED",
  });

  useEffect(() => {
    if (interview) {
      setForm({
        studentId: interview.studentId,
        jobApplicationId: interview.jobApplicationId,
        companyName: interview.companyName,
        interviewDate: interview.interviewDate?.slice(0, 10), // YYYY-MM-DD
        interviewStatus: interview.interviewStatus,
      });
    }
  }, [interview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEdit) {
        // UPDATE
        res = await api.put("/interviews/reschedule", { ...form, id: interview.id });
      } else {
        // ADD
        res = await api.post("/interviews/scheduleInterview", form);
      }
      onSuccess(res.data);
    } catch (err) {
      alert("Failed to save interview");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">{isEdit ? "Edit" : "Add"} Interview</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label>Student ID</label>
            <input
              type="number"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div>
            <label>Job Application ID</label>
            <input
              type="number"
              name="jobApplicationId"
              value={form.jobApplicationId}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div>
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div>
            <label>Interview Date</label>
            <input
              type="date"
              name="interviewDate"
              value={form.interviewDate}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div>
            <label>Status</label>
            <select
              name="interviewStatus"
              value={form.interviewStatus}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="px-3 py-1 border rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 border rounded bg-blue-600 text-white"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
