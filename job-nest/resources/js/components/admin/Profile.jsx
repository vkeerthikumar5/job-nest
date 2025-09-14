import React, { useState, useEffect } from "react";
import api from "../../api_r";
import { Link } from "react-router-dom";

export default function Profile() {
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    contact_number: "",
    address: "",
    established_year: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "" });
  const [load, setLoad] = useState(false);

  // Fetch company data on mount
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoad(true);
        const response = await api.get("/company-details");
        if (response.data) {
          setCompanyData({
            name: response.data.name || "",
            email: response.data.email || "",
            contact_number: response.data.contact_number || "",
            address: response.data.address || "",
            established_year: response.data.established_year || "",
            website: response.data.website || "",
          });
        }
        setLoad(false);
      } catch (err) {
        console.error("Failed to fetch company data", err);
        setLoad(false);
      }
    };
    fetchCompanyData();
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/company-details", companyData);
      setToast({ message: "Company details updated successfully!" });
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
      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 h-32 w-full flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-white text-3xl font-bold">Company Profile</h1>
        <p className="text-white text-lg font-semibold italic mt-2">
          Update your company information to attract talent
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/admin/dashboard" className="text-sm cursor-pointer text-violet-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Loader */}
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
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl border border-gray-300 mt-8 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Company Information
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="name"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  placeholder=" "
                  required
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                             border-b-2 border-gray-300 appearance-none focus:outline-none 
                             focus:ring-0 focus:border-violet-600 peer"
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                             peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-600"
                >
                  Company Name
                </label>
              </div>

              {/* Email */}
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  id="email"
                  value={companyData.email}
                  readOnly
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-gray-100 border-0 
                             border-b-2 border-gray-300 cursor-not-allowed peer"
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 -translate-y-6 scale-75 
                             top-3 -z-10 origin-[0]"
                >
                  Email
                </label>
              </div>

              {/* Contact Number */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="contact_number"
                  value={companyData.contact_number}
                  onChange={(e) => setCompanyData({ ...companyData, contact_number: e.target.value })}
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                             border-b-2 border-gray-300 appearance-none focus:outline-none 
                             focus:ring-0 focus:border-violet-600 peer"
                />
                <label
                  htmlFor="contact_number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                             peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-600"
                >
                  Contact Number
                </label>
              </div>

              {/* Established Year */}
              <div className="relative z-0 w-full group">
                <input
                  type="number"
                  id="established_year"
                  value={companyData.established_year}
                  onChange={(e) => setCompanyData({ ...companyData, established_year: e.target.value })}
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                             border-b-2 border-gray-300 appearance-none focus:outline-none 
                             focus:ring-0 focus:border-violet-600 peer"
                />
                <label
                  htmlFor="established_year"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                             peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-600"
                >
                  Established Year
                </label>
              </div>

              {/* Website */}
              <div className="relative z-0 w-full group">
                <input
                  type="url"
                  id="website"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                             border-b-2 border-gray-300 appearance-none focus:outline-none 
                             focus:ring-0 focus:border-violet-600 peer"
                />
                <label
                  htmlFor="website"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                             peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-600"
                >
                  Website
                </label>
              </div>

              {/* Address */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                             border-b-2 border-gray-300 appearance-none focus:outline-none 
                             focus:ring-0 focus:border-violet-600 peer"
                />
                <label
                  htmlFor="address"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                             transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                             peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-600"
                >
                  Address
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`text-white bg-violet-700 hover:bg-violet-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-6 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {loading ? "Saving..." : "Save Company Details"}
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
