import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import Sidenav from "./Sidenav";
import api from "../../api_r";

export default function ShortlistedCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Assuming your backend route returns all shortlisted candidates for current company
        const res = await api.get("/applications/shortlisted");
        setCandidates(res.data || []);
      } catch (err) {
        console.error("Failed to fetch shortlisted candidates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // Filter candidates based on search input
  const filteredCandidates = candidates.filter(
    (c) =>
      c.user.name.toLowerCase().includes(search.toLowerCase()) ||
      c.user.degree?.toLowerCase().includes(search.toLowerCase()) ||
      c.user.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      c.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.user.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.user.contact_number?.includes(search)
  );

  if (loading) {
    return (
      <div className="p-6 sm:ml-64 flex justify-center items-center mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:ml-64">
      <Sidenav />

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold mb-4">Shortlisted Candidates</h1>

        {/* Search Bar */}
        <div className="mb-4 flex items-center gap-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, degree, specialization, role, email, contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
          />
        </div>

        {/* Candidates Table */}
        {filteredCandidates.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Degree</th>
                  <th className="px-4 py-2 border">Specialization</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Contact</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border ">
                      {c.user.name}
                    </td>
                    <td className="px-4 py-2 border">{c.user.degree || "N/A"}</td>
                    <td className="px-4 py-2 border">{c.user.specialization || "N/A"}</td>
                    <td className="px-4 py-2 border">{c.job?.title || "N/A"}</td>
                    <td className="px-4 py-2 border">{c.user.email || "N/A"}</td>
                    <td className="px-4 py-2 border">{c.user.contact_number || "N/A"}</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        onClick={() => setSelectedUser(c)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        View More
                      </button>
                      <button
                        onClick={() => window.location.href = `mailto:${c.user.email}`}
                        className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
                      >
                        Send Email
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No shortlisted candidates found</p>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedUser.user.name}</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-900 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {selectedUser.user.email}</p>
              <p><strong>Phone:</strong> {selectedUser.user.contact_number}</p>
              <p><strong>DOB:</strong> {selectedUser.user.dob}</p>
              <p><strong>Gender:</strong> {selectedUser.user.gender}</p>
              <p><strong>Address:</strong> {selectedUser.user.address}</p>
              <p><strong>Degree:</strong> {selectedUser.user.degree}</p>
              <p><strong>Specialization:</strong> {selectedUser.user.specialization}</p>
              <p><strong>College:</strong> {selectedUser.user.college_name}</p>
              <p><strong>Graduation Year:</strong> {selectedUser.user.graduation_year}</p>
              <p><strong>CGPA:</strong> {selectedUser.user.cgpa}</p>
              <p><strong>Skills:</strong> {selectedUser.user.skills}</p>
              <p><strong>Projects:</strong> {selectedUser.user.projects}</p>
              <p><strong>Internships:</strong> {selectedUser.user.internships}</p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
