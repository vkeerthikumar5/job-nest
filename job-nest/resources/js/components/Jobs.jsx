import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobApp() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Create or Update job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/jobs/${editingId}`, { title, description });
      } else {
        await axios.post('/api/jobs', { title, description });
      }
      setTitle('');
      setDescription('');
      setEditingId(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit job
  const handleEdit = (job) => {
    setTitle(job.title);
    setDescription(job.description);
    setEditingId(job.id);
  };

  // Delete job
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Job Portal</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="mb-2 p-2 bg-white rounded shadow flex justify-between">
            <div>
              <strong>{job.title}</strong> - {job.description}
            </div>
            <div>
              <button
                onClick={() => handleEdit(job)}
                className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
