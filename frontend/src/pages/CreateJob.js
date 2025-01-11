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

  const onChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
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
    <div>
      <h2>Create Job</h2>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input name="title" type="text" value={formData.title} onChange={onChange} />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={onChange} />
        </div>
        <div>
          <label>Company</label>
          <input name="company" type="text" value={formData.company} onChange={onChange} />
        </div>
        <div>
          <label>Location</label>
          <input name="location" type="text" value={formData.location} onChange={onChange} />
        </div>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;