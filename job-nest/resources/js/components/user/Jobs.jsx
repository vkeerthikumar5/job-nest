import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import { FaBriefcase, FaTools, FaMoneyBillWave, FaMapMarkerAlt, FaClock, FaBuilding } from "react-icons/fa";
import api from "../../api_r";

export default function Jobs() {
  const name = localStorage.getItem("name");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
        setLoading(true)
      const res = await api.get("/user/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }finally {
        setLoading(false); // stop loading
      }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleApply = async (jobId) => {
    try {
      await api.post(`/jobs/${jobId}/apply`);
      alert("Applied successfully!");
      setShowModal(false);   // ✅ close modal
      setSelectedJob(null);  // ✅ reset selected job
      fetchJobs()
    } catch (err) {
      alert(err.response?.data?.message || "Error applying");
    }
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
            Explore available jobs and apply to kickstart your career.
          </p>
{/* 🔹 Loading Spinner */}
{loading ? (
  // 🔹 Spinner
  <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
        </div>
) : (
  // 🔹 Jobs Grid
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {jobs.length === 0 ? (
      <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
        No jobs available
      </p>
    ) : (
      jobs.map((job) => (
        <div
          key={job.id}
          className="p-6 border rounded-lg shadow bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <FaBriefcase className="text-indigo-600" /> {job.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaBuilding className="text-indigo-500" /> {job.company?.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaTools className="text-indigo-500" /> {job.skills}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" /> {job.package} LPA
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> {job.location}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaClock className="text-blue-500" /> {job.timings} | {job.mode}
          </p>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleViewJob(job)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              View Description
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
                {selectedJob.title}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Company:</strong> {selectedJob.company?.name}</p>
              <p><strong>Skills:</strong> {selectedJob.skills}</p>
              <p><strong>Package:</strong> {selectedJob.package} LPA</p>
              <p><strong>Mode:</strong> {selectedJob.mode}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Timings:</strong> {selectedJob.timings}</p>
              <p><strong>Description:</strong> {selectedJob.desc}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleApply(selectedJob.id)}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
