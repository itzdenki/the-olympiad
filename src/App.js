import React, { useState } from 'react';
import './App.css';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('main');

  const handleRegisterSuccess = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentPage('main');
  };

  return (
    <div className="App">
      <ToastContainer />
      {currentPage === 'main' && (
        <div className="button-group">
          <button onClick={() => setCurrentPage('register')}>Register</button>
          <button onClick={() => setCurrentPage('login')}>Login</button>
        </div>
      )}
      {currentPage === 'register' && <Register onRegisterSuccess={handleRegisterSuccess} />}
      {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'home' && <Home onLogout={handleLogout} />}
    </div>
  );
};

export default App;
