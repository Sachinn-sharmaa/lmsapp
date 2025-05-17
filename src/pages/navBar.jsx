import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navBar.css'; // Create a separate CSS for navigation styling

const NavBar = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCourses = () => {
    navigate('/dashboard'); // Or specific route to "My Courses"
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>FindMyTution</div>
      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <button onClick={handleCourses}>Courses</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
