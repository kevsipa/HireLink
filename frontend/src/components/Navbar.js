// jobify-frontend/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-blue-600 text-white">
      <div className="text-xl font-bold">
        <Link to="/">HireLink</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/create-job" className="mx-2 hover:underline">
              Create Job
            </Link>
            <Link to="/profile" className="mx-2 hover:underline">
              Profile
            </Link>
            <button
              onClick={logout}
              className="ml-4 bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mx-2 hover:underline">
              Login
            </Link>
            <Link to="/register" className="mx-2 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
