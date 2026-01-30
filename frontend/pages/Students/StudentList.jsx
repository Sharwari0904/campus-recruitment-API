import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    let mounted = true;
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students/allStudents");
        if (mounted) setStudents(res.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to load"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStudents();
    return () => {
      mounted = false;
    };
  }, []);

  // DELETE STUDENT
  const deleteStudent = (id) => {
    api
      .delete(`/students/deleteStudent/${id}`)
      .then(() => {
        alert("Deleted successfully");
        setStudents((prev) => prev.filter((s) => s.id !== id));
      })
      .catch(() => alert("Failed to delete"));
  };

  // ADD STUDENT FUNCTION
  const addStudent = async () => {
    if (!newStudent.name || !newStudent.department || !newStudent.email) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await api.post("/students/register", newStudent);

      alert("Student added!");
      setStudents((prev) => [...prev, res.data]);

      // Reset form
      setNewStudent({
        name: "",
        department: "",
        email: "",
      });

      setShowForm(false);
    } catch (err) {
      alert("Failed to add student");
    }
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Students</h2>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setShowForm(true)}
        >
          Add Student
        </button>
      </div>

      {/* ADD STUDENT FORM */}
      {showForm && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Add New Student</h3>

          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 w-1/3 rounded"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Department"
              className="border p-2 w-1/3 rounded"
              value={newStudent.department}
              onChange={(e) =>
                setNewStudent({ ...newStudent, department: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-1/3 rounded"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={addStudent}
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

      {/* STUDENTS TABLE */}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Department</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{s.id}</td>
              <td className="p-2">
                {s.name}
              </td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">{s.department}</td>
              <td className="p-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => deleteStudent(s.id)}
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
