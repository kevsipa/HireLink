// jobify-frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Optionally, we can add interceptors to attach auth token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;