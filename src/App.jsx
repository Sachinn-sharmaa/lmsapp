// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegistrationForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
