import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import User_Dashboard from '../components/user/User_Dashboard';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProtectedRoute from '../ProtectedRoute';
import Register from '../components/Register';
import Main from './Main';
import SA_Dashboard from '../components/super-admin/SA_Dashboard';
import RecruiterRegistration from '../components/RecruiterRegistration';
import UserManagement from '../components/super-admin/UserManagement';
import RecruiterManagement from '../components/super-admin/Recruiters';
import Dummy from '../components/Dummy';
import UserForm from '../components/user/UserForm';
import RecruiterLogin from '../components/RecruiterLogin';
import JobPostings from '../components/admin/JobPostings';
import Profile from '../components/admin/Profile';
import JobDetails from '../components/admin/JobDetails';
import Jobs from '../components/user/Jobs';
import AppliedJobs from '../components/user/AppliedJobs';
import ShortlistedCandidates from '../components/admin/ShortlistedCandidates';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recruiter_login" element={<RecruiterLogin />} />

        </Route>
        <Route path="/recruiter-registration" element={<RecruiterRegistration />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <User_Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="user">
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/jobs"
          element={
            <ProtectedRoute role="user">
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/applied-jobs"
          element={
            <ProtectedRoute role="user">
              <AppliedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/job-postings"
          element={
            <ProtectedRoute role="admin">
              <JobPostings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/job-details/:jobId"
          element={
            <ProtectedRoute role="admin">
              <JobDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/shortlisted-candidates"
          element={
            <ProtectedRoute role="admin">
              <ShortlistedCandidates/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/super-admin/dashboard"
          element={
            <ProtectedRoute role="super-admin">
              <SA_Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/super-admin/user-management"
          element={
            <ProtectedRoute role="super-admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/super-admin/recruiters"
          element={
            <ProtectedRoute role="super-admin">
              <RecruiterManagement />
            </ProtectedRoute>
          }
        />

        <Route path='/' element={<Dummy />} />

      </Routes>
    </BrowserRouter>
  );
}
