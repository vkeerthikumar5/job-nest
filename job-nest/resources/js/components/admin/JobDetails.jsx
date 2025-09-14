import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Sidenav from "./Sidenav";
import api from "../../api_r";

export default function JobDetails() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/jobs/${jobId}/applications`);
        setJob(res.data.job || null);
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error("Failed to load job details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [jobId]);

  const handleViewProfile = (app) => {
    setSelectedUser(app);
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      setActionLoading(applicationId);
      await api.patch(`/applications/${applicationId}/status`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status } : app
        )
      );

      setSelectedUser(null);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6 sm:ml-64">
      <Sidenav /> {/* Always visible */}

      {/* Job + Applications Section */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
        </div>
      ) : (
        <>
          {/* Job Details */}
          {job && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
              <p className="text-gray-700 mb-1"><strong>Description:</strong> {job.desc}</p>
              <p className="text-gray-700 mb-1"><strong>Skills:</strong> {job.skills}</p>
              <p className="text-gray-700 mb-1"><strong>Package:</strong> {job.package} LPA</p>
              <p className="text-gray-700 mb-1">
                <strong>Mode:</strong> {job.mode} | <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-700 mb-1"><strong>Timings:</strong> {job.timings}</p>
              <p className="text-gray-500 text-sm">Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
            </div>
          )}

          {/* Applications Table */}
          <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Applications</h2>
            {applications.length > 0 ? (
              <table className="min-w-full table-auto border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Degree</th>
                    <th className="px-4 py-2 border">Specialization</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border ">
                         {app.user?.name || "N/A"}
                      </td>
                      <td className="px-4 py-2 border">{app.user?.degree || "N/A"}</td>
                      <td className="px-4 py-2 border">{app.user?.specialization || "N/A"}</td>
                      <td className="px-4 py-2 border">{app.status}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleViewProfile(app)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No applications yet</p>
            )}
          </div>
        </>
      )}

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
              <p><strong>Applied Jobs Count:</strong> {selectedUser.user.applied_jobs_count}</p>
            </div>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => handleUpdateStatus(selectedUser.id, "Shortlisted")}
                disabled={actionLoading === selectedUser.id}
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                {actionLoading === selectedUser.id ? "Loading..." : "Mark Shortlisted"}
              </button>

              <button
                onClick={() => handleUpdateStatus(selectedUser.id, "Rejected")}
                disabled={actionLoading === selectedUser.id}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                {actionLoading === selectedUser.id ? "Loading..." : "Mark Rejected"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
