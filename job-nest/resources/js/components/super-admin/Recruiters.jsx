import React, { useState, useEffect } from 'react';
import Sidenav from './Sidenav';
import api from '../../api_r';

export default function RecruiterManagement() {
    const [recruiters, setRecruiters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false); // for page load
    const [buttonLoadingId, setButtonLoadingId] = useState(null); // for button loader

    // Function to fetch recruiters
    const fetchRecruiters = async () => {
        try {
            setLoading(true);
            const res = await api.get("/recruiters");
            setRecruiters(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching recruiters:", err);
            setLoading(false);
        }
    };

    // Call fetchRecruiters on component mount
    useEffect(() => {
        fetchRecruiters();
    }, []);

    const filteredRecruiters = recruiters.filter(rec =>
        Object.values(rec).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const toggleActivation = async (id) => {
        try {
            setButtonLoadingId(id); // show loader for clicked button
            const recruiter = recruiters.find(r => r.id === id);
            const updatedStatus = !recruiter.is_active;

            await api.patch(`/recruiters/${id}/toggle-activation`, {
                is_active: updatedStatus
            });

            // Update local state
            setRecruiters(prev =>
                prev.map(rec =>
                    rec.id === id ? { ...rec, is_active: updatedStatus } : rec
                )
            );
        } catch (err) {
            console.error('Error toggling recruiter status:', err);
        } finally {
            setButtonLoadingId(null); // stop loader
        }
    };

    return (
        <section className="flex">
            <Sidenav />
            <div className="flex-1 p-6 sm:ml-64">
                <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
                    <h1 className="text-2xl text-center font-bold mb-6 text-gray-800 dark:text-gray-200">
                        Recruiter Management
                    </h1>

                    {/* Search Input */}
                    <div className="flex justify-center mb-6">
                        <input
                            type="text"
                            placeholder="Search recruiters..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">S.No</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Company Name</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Contact</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Established Year</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Jobs Posted</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">
                                            Loading recruiters...
                                        </td>
                                    </tr>
                                ) : filteredRecruiters.length > 0 ? (
                                    filteredRecruiters.map((rec, index) => (
                                        <tr key={rec.id} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 whitespace-nowrap text-center">{index + 1}</td>
                                            <td className="px-4 py-2 max-w-xs truncate text-center">{rec.name}</td>
                                            <td className="px-4 py-2 max-w-xs truncate text-center">{rec.email}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-center">{rec.contact_number}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-center">{rec.established_year}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-center">{rec.jobs_count || 0}</td>
                                            <td className="px-4 py-2 flex gap-2 whitespace-nowrap justify-center">
                                                <button
                                                    onClick={() => toggleActivation(rec.id)}
                                                    disabled={buttonLoadingId === rec.id}
                                                    className={`px-3 py-1 rounded text-white flex items-center justify-center gap-2 ${
                                                        rec.is_active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                                    } ${buttonLoadingId === rec.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                >
                                                    {buttonLoadingId === rec.id ? (
                                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                                    ) : (
                                                        rec.is_active ? 'Revoke Access' : 'Activate'
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">
                                            No recruiters found.
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
