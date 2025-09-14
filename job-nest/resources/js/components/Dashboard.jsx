import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and role
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
