// jobify-frontend/src/pages/Register.js
import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seeker',
  });
  const [msg, setMsg] = useState('');

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      // Immediately log the user in
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      setMsg(err.response?.data?.msg || 'Error registering');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input name="username" type="text" value={formData.username} onChange={onChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={onChange} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={formData.password} onChange={onChange} />
        </div>
        <div>
          <label>Role</label>
          <select name="role" value={formData.role} onChange={onChange}>
            <option value="seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
