import React, { useState, useEffect, useRef } from "react";
import Sidenav from "./Sidenav";
import api from "../../api_r";
import { useNavigate } from "react-router-dom";

import {
    FaBriefcase,
    FaTools,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaClock,
    FaCalendarAlt,
    FaUsers,
    FaTrash,
    FaEdit,
    FaEllipsisV
} from "react-icons/fa";

export default function JobPostings() {
    const [showModal, setShowModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loadingJobId, setLoadingJobId] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null); // Track which job's menu is open
    const menuRef = useRef(null);
    const [editingJob, setEditingJob] = useState(null);
    const [loading, setLoading] = useState(false); // global loading for fetching jobs
    
    const navigate = useNavigate();

    const handleViewApplicants = (jobId) => {
        navigate(`/admin/job-details/${jobId}`);
    };

    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        skills: "",
        package: "",
        mode: "On-site",
        location: "",
        timings: "",
    });

    // Fetch company jobs
    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get("/jobs"); // should return only logged-in company jobs
            setJobs(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            // if the clicked element does not have the class 'job-menu-button' or inside a dropdown, close menu
            if (!e.target.closest(".job-menu-button") && !e.target.closest(".job-menu-dropdown")) {
                setMenuOpenId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingJob) {
                // Edit mode
                await api.put(`/jobs/${editingJob.id}`, formData);
            } else {
                // Add mode
                await api.post("/jobs", formData);
            }

            setShowModal(false);
            setEditingJob(null); // reset
            setFormData({
                title: "",
                desc: "",
                skills: "",
                package: "",
                mode: "On-site",
                location: "",
                timings: "",
            });
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert("Error saving job");
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            setLoadingJobId(id);
            const res = await api.delete(`/jobs/${id}`);
            console.log(res.data);
            fetchJobs();
        } catch (err) {
            console.error("Failed to delete job", err);
        } finally {
            setLoadingJobId(null);
        }
    };

    const handleArchive = async (id, action) => {
        try {
            setLoadingJobId(id);

            // Optimistically update job status
            setJobs((prevJobs) =>
                prevJobs.map((job) =>
                    job.id === id
                        ? { ...job, status: action === "archive" ? "archived" : "active" }
                        : job
                )
            );

            await api.patch(`/jobs/${id}/archive`, { action });
            fetchJobs(); // ensure sync with backend
        } catch (err) {
            console.error("Failed to archive", err);
            fetchJobs(); // rollback in case of error
        } finally {
            setLoadingJobId(null);
        }
    };



    return (
        <div className="flex">
            <Sidenav />

            <div className="flex-1 p-6 sm:ml-64">
                <div className="p-6 border rounded-lg shadow-md bg-white">
                    <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
                        Job Postings
                    </h1>
                    <p className="text-center text-gray-600 mb-6">
                        Manage your Jobs here
                    </p>

                    {/* Trigger Button */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => {
                                setEditingJob(null); // make sure we are in Add mode
                                setFormData({          // reset form fields
                                    title: "",
                                    desc: "",
                                    skills: "",
                                    package: "",
                                    mode: "On-site",
                                    location: "",
                                    timings: "",
                                });
                                setShowModal(true);
                            }}
                            className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 
    focus:outline-none focus:ring-violet-300 font-medium rounded-lg 
    text-sm px-5 py-2.5 text-center inline-flex items-center"
                        >
                            Add Jobs
                        </button>

                    </div>

                    {/* Job Cards */}
                    {loading ? (
                        <div className="flex justify-center items-center mt-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
                        </div>
                    ) : jobs.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="border rounded-xl shadow-lg p-6 bg-gradient-to-br from-violet-50 to-white hover:shadow-xl transition duration-300 flex flex-col justify-between"
                                >
                                    {/* Title + 3 Dots */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            <FaBriefcase className="text-violet-600" /> {job.title}
                                        </h2>

                                        {/* 3 Dots Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() =>
                                                    setMenuOpenId(menuOpenId === job.id ? null : job.id)
                                                }
                                                className="p-2 rounded-full hover:bg-gray-200 job-menu-button"
                                            >
                                                <FaEllipsisV />
                                            </button>

                                            {menuOpenId === job.id && (
                                                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-10 job-menu-dropdown">
                                                    <button
                                                        onClick={() => {
                                                            setEditingJob(job);
                                                            setFormData({
                                                                title: job.title,
                                                                desc: job.desc,
                                                                skills: job.skills,
                                                                package: job.package,
                                                                mode: job.mode,
                                                                location: job.location,
                                                                timings: job.timings,
                                                            });
                                                            setShowModal(true);
                                                            setMenuOpenId(null);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(job.id)}
                                                        disabled={loadingJobId === job.id}
                                                        className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded ${loadingJobId === job.id ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    >
                                                        {loadingJobId === job.id ? "Deleting..." : "Delete"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>


                                    </div>

                                    {/* Job Details */}
                                    <div className="flex-1">
                                        <p className="text-gray-700 mb-3 flex items-center gap-2">
                                            <FaTools className="text-violet-500" /> {job.skills}
                                        </p>
                                        <p className="text-gray-700 mb-3 flex items-center gap-2">
                                            <FaMoneyBillWave className="text-green-600" /> {job.package} LPA
                                        </p>
                                        <p className="text-gray-700 mb-3 flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-red-500" /> {job.location}
                                        </p>
                                        <p className="text-gray-700 mb-3 flex items-center gap-2">
                                            <FaClock className="text-blue-500" /> {job.timings} | {job.mode}
                                        </p>
                                        <p className="text-gray-500 text-sm flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" /> Posted on{" "}
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Buttons at Bottom */}
                                    <div className="flex justify-between items-center mt-6">
                                        <button
                                            onClick={() => handleViewApplicants(job.id)}
                                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                                        >
                                            View Applicants
                                        </button>


                                        {job.status === "archived" ? (
                                            <button
                                                onClick={() => handleArchive(job.id, "activate")}
                                                disabled={loadingJobId === job.id}
                                                className={`px-4 py-2 rounded-lg text-white text-sm ${loadingJobId === job.id
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-green-600 hover:bg-green-700"
                                                    }`}
                                            >
                                                {loadingJobId === job.id ? "Loading..." : "Activate"}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleArchive(job.id, "archive")}
                                                disabled={loadingJobId === job.id}
                                                className={`px-4 py-2 rounded-lg text-white text-sm ${loadingJobId === job.id
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                            >
                                                {loadingJobId === job.id ? "Loading..." : "Archive"}
                                            </button>
                                        )}
                                    </div>
                                </div>


                            ))}
                        </div>

                    ) : (
                        <p className="text-center text-gray-500 mt-10">
                            No jobs posted yet. Add one above.
                        </p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative bg-white rounded-lg shadow w-full max-w-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add Job Posting
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-violet-500 focus:border-violet-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-violet-500 focus:border-violet-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Skills Required
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-violet-500 focus:border-violet-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Package (LPA)
                                        </label>
                                        <input
                                            type="text"
                                            name="package"
                                            value={formData.package}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-violet-500 focus:border-violet-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Mode of Work
                                        </label>
                                        <select
                                            name="mode"
                                            value={formData.mode}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-violet-500 focus:border-violet-500"
                                        >
                                            <option>On-site</option>
                                            <option>Remote</option>
                                            <option>Hybrid</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-violet-500 focus:border-violet-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Work Timings
                                        </label>
                                        <input
                                            type="text"
                                            name="timings"
                                            value={formData.timings}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-violet-500 focus:border-violet-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                                    >
                                        Save Job
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
