import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import {
  FaBriefcase,
  FaTools,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import api from "../../api_r";

export default function AppliedJobs() {
  const name = localStorage.getItem("name");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/applied-jobs"); // 🔹 fetch only applied jobs
      setAppliedJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch applied jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
          <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 dark:text-gray-200">
            Welcome {name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Here are the jobs you have applied for.
          </p>

          {/* 🔹 Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
          </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {appliedJobs.length === 0 ? (
                <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
                  You haven’t applied to any jobs yet.
                </p>
              ) : (
                appliedJobs.map((application) => (
                  <div
                    key={application.id}
                    className="p-6 border rounded-lg shadow bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900"
                  >
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <FaBriefcase className="text-green-600" />{" "}
                      {application.job?.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <FaBuilding className="text-green-500" />{" "}
                      {application.job?.company?.name}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <FaMoneyBillWave className="text-green-600" />{" "}
                      {application.job?.package} LPA
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />{" "}
                      {application.job?.location}
                    </p>

                    {/* Status Badge */}
                    <p className="mt-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          application.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "Shortlisted"
                            ? "bg-blue-100 text-blue-800"
                            : application.status === "Hired"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    </p>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleViewJob(application)}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {selectedJob.job?.title}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Company:</strong> {selectedJob.job?.company?.name}
              </p>
              <p>
                <strong>Skills:</strong> {selectedJob.job?.skills}
              </p>
              <p>
                <strong>Package:</strong> {selectedJob.job?.package} LPA
              </p>
              <p>
                <strong>Mode:</strong> {selectedJob.job?.mode}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.job?.location}
              </p>
              <p>
                <strong>Timings:</strong> {selectedJob.job?.timings}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.job?.desc}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(selectedJob.applied_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedJob.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedJob.status === "Shortlisted"
                      ? "bg-blue-100 text-blue-800"
                      : selectedJob.status === "Hired"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedJob.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
