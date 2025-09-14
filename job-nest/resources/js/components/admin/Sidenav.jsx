import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,   // Dashboard
  FaBriefcase,       // Job Postings
  FaUsers,           // Applicants
  FaUserCheck,       // Shortlisted
  FaCalendarCheck,   // Interviews
  FaUserCircle,      // Profile
  FaSignOutAlt       // Logout
} from "react-icons/fa";

export default function Sidenav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and role
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const linkClasses =
    "flex items-center gap-2 p-2 rounded-lg group transition duration-200";
  const baseText = "text-white dark:text-gray-400";
  const activeText = "bg-white text-violet-700 font-semibold";

  return (
    <div>
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-violet-700 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? activeText
                      : baseText + " hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <FaTachometerAlt />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/job-postings"
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? activeText
                      : baseText + " hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <FaBriefcase />
                Job Postings
              </NavLink>
            </li>

            

            <li>
              <NavLink
                to="/admin/shortlisted-candidates"
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? activeText
                      : baseText + " hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <FaUserCheck />
                Shortlisted Candidates
              </NavLink>
            </li>

            

            <li>
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? activeText
                      : baseText + " hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <FaUserCircle />
                Profile
              </NavLink>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className={`${linkClasses} ${baseText} hover:bg-gray-100 hover:text-gray-900 w-full text-left`}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
