import React, { useState, useEffect } from 'react';
import Sidenav from './Sidenav';
import api from '../../api_r'; // Make sure this is your axios instance

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users'); // Your backend route
      setUsers(res.data); // Save users from backend
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    Object.values(user).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="flex">
      <Sidenav />
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
          <h1 className="text-2xl text-center font-bold mb-6 text-gray-800 dark:text-gray-200">
            User Management
          </h1>

          {/* Centered Search Input */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Degree</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Specialization</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No. of Applied</th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.contact_number||'NA'}</td>
                      <td className="px-4 py-2">{user.degree||'NA'}</td>
                      <td className="px-4 py-2">{user.specialization||'NA'}</td>
                      <td className="px-4 py-2">{user.applications_count||'NA'} </td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
