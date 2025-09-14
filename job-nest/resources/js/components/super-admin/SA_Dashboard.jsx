import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";

import api from "../../api_r";
export default function SA_Dashboard() {
 const name=localStorage.getItem('name')
 const [stats, setStats] = useState({});
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchStats = async () => {
     try {
       const res = await api.get("/sadashboard/stats");
       setStats(res.data);
     } catch (err) {
       console.error("Failed to fetch dashboard stats", err);
     } finally {
       setLoading(false);
     }
   };
   fetchStats();
 }, []);

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
            Welcome to your dashboard. Here you can manage your profile,
            view your activity, and access important resources.
          </p>
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
            </div>
          ) : (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                Total Users
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.total_users}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                Total Recruiters
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.total_companies}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Pending Activations
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.pending_activations}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Total Jobs
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.total_jobs}
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Active Jobs
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.active_jobs}
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Total Applications
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.total_applications}
              </p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
