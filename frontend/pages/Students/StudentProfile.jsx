import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedStudent = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (!loggedStudent) {
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/curStudent/${loggedStudent.id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Failed to load student", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const updateStudent = async () => {
    try {
      const res = await api.put(
        `/students/updateStudent`,
        student
      );

      alert("Profile updated successfully!");
      setEditing(false);

      // update local storage
      localStorage.setItem("student", JSON.stringify(student));
    } catch (err) {
      alert("Failed to update profile");
      console.error(err);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!student) return <div className="text-red-600">Profile not found</div>;

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      {/* Name */}
      <label className="block mb-2 font-medium">Full Name</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        disabled={!editing}
        value={student.name}
        onChange={(e) => setStudent({ ...student, name: e.target.value })}
      />

      {/* Email */}
      <label className="block mb-2 font-medium">Email</label>
      <input
        type="email"
        className="w-full p-2 mb-4 border rounded"
        disabled={!editing}
        value={student.email}
        onChange={(e) => setStudent({ ...student, email: e.target.value })}
      />

      {/* Phone */}
      <label className="block mb-2 font-medium">Phone</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        disabled={!editing}
        value={student.contactNumber}
        onChange={(e) =>
          setStudent({ ...student, contactNumber: e.target.value })
        }
      />

      {/* Department */}
      <label className="block mb-2 font-medium">Department</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        disabled={!editing}
        value={student.department}
        onChange={(e) =>
          setStudent({ ...student, department: e.target.value })
        }
      />

      {/* Graduation Year */}
      <label className="block mb-2 font-medium">Graduation Year</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        disabled={!editing}
        value={student.graduationYear}
        onChange={(e) =>
          setStudent({ ...student, graduationYear: e.target.value })
        }
      />

      {/* Buttons */}
      {!editing ? (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setEditing(true)}
        >
          Edit Profile
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={updateStudent}
          >
            Save Changes
          </button>

          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
