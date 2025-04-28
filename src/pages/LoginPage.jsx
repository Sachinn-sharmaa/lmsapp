// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegisterOptions, setShowRegisterOptions] = useState(false); // <-- New state

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

  const redirectToRegister = (role) => {
    navigate(`/register?role=${role}`);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>

      <p>{message}</p>

      {/* Toggle Register Options */}
      {!showRegisterOptions ? (
        <div>
          <p>New User?</p>
          <button onClick={() => setShowRegisterOptions(true)}>Register</button>
        </div>
      ) : (
        <div>
          <h4>Select Role to Register:</h4>
          <button onClick={() => redirectToRegister('student')}>Register as Student</button>
          <button onClick={() => redirectToRegister('teacher')}>Register as Teacher</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
