import React from 'react';
import '../styles/HomePage.css'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goBack = () => {
    navigate(-1); // ✅ Navigate one step back in browser history
  };

  const replaceLogin = () => {
    navigate('/login', { replace: true }); // ✅ Replace history entry
  };
  return (
    <div className="homepage-container">
      
      {/* Header */}
      <header className="header">
        <div className="logo">FindMyTution</div>
        <button onClick={goToLogin}>Go to Login</button>
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
