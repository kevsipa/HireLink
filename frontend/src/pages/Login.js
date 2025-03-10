// jobify-frontend/src/pages/Login.js
import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      setMsg(err.response?.data?.msg || 'Error logging in');
    }
  };

  return (
    <div>
      <h2 className="text-2x1 font-bold mb-4">Login</h2>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Email </label>
          <input class="border-2 border-indigo-500" name="email" type="email" value={formData.email} onChange={onChange} />
        </div>
        <div>
          <label>Password </label>
          <input class="border-2 border-indigo-500" name="password" type="password" value={formData.password} onChange={onChange} />
        </div>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >Login</button>
      </form>
    </div>
  );
};

export default Login;
