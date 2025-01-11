// jobify-frontend/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/create-job" style={{ marginLeft: '10px' }}>
            Create Job
          </Link>
          <Link to="/profile" style={{ marginLeft: '10px' }}>
            Profile
          </Link>
          <button onClick={logout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: '10px' }}>
            Login
          </Link>
          <Link to="/register" style={{ marginLeft: '10px' }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;