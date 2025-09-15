import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import RecruiterLogin from '../components/RecruiterLogin';
import RecruiterRegistration from '../components/RecruiterRegistration';

import User_Dashboard from '../components/user/User_Dashboard';
import UserForm from '../components/user/UserForm';
import Jobs from '../components/user/Jobs';
import AppliedJobs from '../components/user/AppliedJobs';

import AdminDashboard from '../components/admin/AdminDashboard';
import JobPostings from '../components/admin/JobPostings';
import Profile from '../components/admin/Profile';
import JobDetails from '../components/admin/JobDetails';
import ShortlistedCandidates from '../components/admin/ShortlistedCandidates';

import SA_Dashboard from '../components/super-admin/SA_Dashboard';
import UserManagement from '../components/super-admin/UserManagement';
import RecruiterManagement from '../components/super-admin/Recruiters';

import ProtectedRoute from '../ProtectedRoute';
import Main from './Main';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<Main />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recruiter_login" element={<RecruiterLogin />} />
        </Route>
        <Route path="/recruiter-registration" element={<RecruiterRegistration />} />

        {/* User routes */}
        <Route path="/user" element={<ProtectedRoute role="user" />}>
          <Route path="dashboard" element={<User_Dashboard />} />
          <Route path="profile" element={<UserForm />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="job-postings" element={<JobPostings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job-details/:jobId" element={<JobDetails />} />
          <Route path="shortlisted-candidates" element={<ShortlistedCandidates />} />
        </Route>

        {/* Super Admin routes */}
        <Route path="/super-admin" element={<ProtectedRoute role="super-admin" />}>
          <Route path="dashboard" element={<SA_Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="recruiters" element={<RecruiterManagement />} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}
