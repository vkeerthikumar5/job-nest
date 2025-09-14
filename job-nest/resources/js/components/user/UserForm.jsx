import React, { useState, useEffect } from "react";
import api from "../../api_r";
import { Link } from "react-router-dom";

export default function UserForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
    address: "",
    degree: "",
    specialization: "",
    collegeName: "",
    graduationYear: "",
    cgpa: "",
    skills: "",
    projects: "",
    internships: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "" });
  const [load, setLoad] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoad(true);
        const response = await api.get("/user-details");
        if (response.data) {
          setUserData({
            name: response.data.name || "",
            email: response.data.email || "",
            contact: response.data.contact_number || "",
            dob: response.data.dob || "",
            gender: response.data.gender || "",
            address: response.data.address || "",
            degree: response.data.degree || "",
            specialization: response.data.specialization || "",
            collegeName: response.data.college_name || "",
            graduationYear: response.data.graduation_year || "",
            cgpa: response.data.cgpa || "",
            skills: response.data.skills || "",
            projects: response.data.projects || "",
            internships: response.data.internships || "",
          });
        }
        setLoad(false);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setLoad(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/user-details", {
        dob: userData.dob,
        contact: userData.contact,
        gender: userData.gender,
        address: userData.address,
        degree: userData.degree,
        specialization: userData.specialization,
        college_name: userData.collegeName,
        graduation_year: userData.graduationYear,
        cgpa: userData.cgpa,
        skills: userData.skills,
        projects: userData.projects,
        internships: userData.internships,
      });
      setToast({ message: "Details saved successfully!" });
    } catch (err) {
      let errorMessage = "Failed to save details!";
      if (err.response?.data?.errors) {
        const firstErrorField = Object.keys(err.response.data.errors)[0];
        errorMessage = err.response.data.errors[firstErrorField][0];
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setToast({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {/* Banner */}
      <div className="bg-gradient-to-br from-sky-500 to-violet-600 h-32 w-full flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-white text-3xl font-bold">JobNest</h1>
        <p className="text-white text-lg font-semibold italic mt-2">
          Complete your profile to get matched with recruiters!
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/user/dashboard" className="text-sm cursor-pointer text-violet-600 hover:underline">
          Click here to go back to Dashboard
        </Link>
      </div>

      {load ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
        </div>
      ) : (
        <>
          {/* Toast */}
          {toast.message && (
            <div className="flex justify-center mt-4">
              <div
                className="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-sm"
                role="alert"
              >
                <div className="ps-4 text-sm font-normal">{toast.message}</div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-300 mt-8 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Personal Information
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Name & Email */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Full Name */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    value={userData.name}
                    readOnly
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-gray-100 border-0 border-b-2 border-gray-300 cursor-not-allowed peer"
                  />
                  <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    Full Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-gray-100 border-0 border-b-2 border-gray-300 cursor-not-allowed peer"
                  />
                  <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    Email
                  </label>
                </div>

                {/* Contact */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    value={userData.contact}
                    onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    required
                  />
                  <label
                    htmlFor="contact"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    Mobile Number
                  </label>
                </div>
              </div>

              {/* DOB, Gender, Address */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {/* DOB */}
                <div className="relative z-0 w-full group">
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    required
                  />
                  <label
                    htmlFor="dob"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    Date of Birth
                  </label>
                </div>

                {/* Gender */}
                <div className="relative z-0 w-full group">
                  <select
                    value={userData.gender}
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    Gender
                  </label>
                </div>

                {/* Address */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    required
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    Address
                  </label>
                </div>
              </div>

              {/* Education */}
              <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-6 border-b pb-2">Education</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Degree */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    value={userData.degree}
                    onChange={(e) => setUserData({ ...userData, degree: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                  />
                  <label
                    htmlFor="degree"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    Degree
                  </label>
                </div>

                {/* Specialization */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    value={userData.specialization}
                    onChange={(e) => setUserData({ ...userData, specialization: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                  />
                  <label
                    htmlFor="specialization"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    Specialization
                  </label>
                </div>

                {/* College Name */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    value={userData.collegeName}
                    onChange={(e) => setUserData({ ...userData, collegeName: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                  />
                  <label
                    htmlFor="collegeName"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    College Name
                  </label>
                </div>

                {/* Graduation Year */}
                <div className="relative z-0 w-full group">
                  <input
                    type="number"
                    value={userData.graduationYear}
                    onChange={(e) => setUserData({ ...userData, graduationYear: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                  />
                  <label
                    htmlFor="graduationYear"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    Graduation Year
                  </label>
                </div>

                {/* CGPA */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    value={userData.cgpa}
                    onChange={(e) => setUserData({ ...userData, cgpa: e.target.value })}
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                  />
                  <label
                    htmlFor="cgpa"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75
                               top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0
                               peer-placeholder-shown:scale-100 peer-focus:-translate-y-6
                               peer-focus:scale-75 peer-focus:text-violet-600"
                  >
                    CGPA
                  </label>
                </div>
              </div>

              {/* Skills & Projects */}
              <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-6 border-b pb-2">Skills & Projects</h2>
              <div className="grid md:grid-cols-1 gap-6">
                {/* Skills */}
                <div className="relative z-0 w-full group">
                  <textarea
                    value={userData.skills}
                    onChange={(e) => setUserData({ ...userData, skills: e.target.value })}
                    rows={3}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    Skills
                  </label>
                </div>

                {/* Projects */}
                <div className="relative z-0 w-full group">
                  <textarea
                    value={userData.projects}
                    onChange={(e) => setUserData({ ...userData, projects: e.target.value })}
                    rows={3}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    Projects
                  </label>
                </div>

                {/* Internships */}
                <div className="relative z-0 w-full group">
                  <textarea
                    value={userData.internships}
                    onChange={(e) => setUserData({ ...userData, internships: e.target.value })}
                    rows={3}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    Internships
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-6 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {loading ? "Saving..." : "Save Details"}
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
