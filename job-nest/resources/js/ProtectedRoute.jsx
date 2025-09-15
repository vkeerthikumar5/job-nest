import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api_r';
import { Outlet } from 'react-router-dom';
export default function ProtectedRoute({ role }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
      setAuthorized(false);
      return;
    }

    if (role && userRole !== role) {
      setAuthorized(false);
      return;
    }

    api.get('/me')
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false));
  }, [role]);

  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" replace />;
  return <Outlet />;
}
