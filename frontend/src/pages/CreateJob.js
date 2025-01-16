// jobify-frontend/src/pages/CreateJob.js
import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
  });
  const [msg, setMsg] = useState('');

  const onChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (user.role !== 'employer') {
      return setMsg('Only employers can create job postings.');
    }

    try {
      await axios.post('/api/jobs', formData);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      setMsg(err.response?.data?.msg || 'Error creating job');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>
      {msg && <p className="text-red-500 mb-4">{msg}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            name="company"
            type="text"
            value={formData.company}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;