import React, { useState } from 'react';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [showRegisterOptions, setShowRegisterOptions] = useState(false);

  const goToLogin = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    setShowRegisterOptions(!showRegisterOptions);
  };

  const handleRegisterAs = (role) => {
    navigate('/register', { state: { role } }); // ✅ Pass role to RegisterPages.jsx
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="logo">FindMyTution</div>
        <div>
          <button onClick={goToLogin}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
          {showRegisterOptions && (
            <div className="register-options">
              <button onClick={() => handleRegisterAs('student')}>Register as Student</button>
              <button onClick={() => handleRegisterAs('teacher')}>Register as Teacher</button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <p className="tagline">Restricted by opportunities?</p>
        <h1 className="main-heading">
          Learn Smarter, Score Higher! <br /> Get the career you deserve. Faster.
        </h1>
        <p className="subheading">
          Personalized live classes, expert tutors, and instant doubt-solving — everything your child needs to succeed in school and beyond.
        </p>
        <button className="explore-button">Explore offerings</button>
      </section>
    </div>
  );
};

export default HomePage;
