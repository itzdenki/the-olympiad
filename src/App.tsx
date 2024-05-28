import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';
import './App.css'

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('home');
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      {currentScreen === 'home' && (
        <div className="container">
          <button className="register" onClick={() => setCurrentScreen('register')}>Register</button>
          <button className="login" onClick={() => setCurrentScreen('login')}>Login</button>
        </div>
      )}
      {currentScreen === 'register' && <Register setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'login' && <Login setCurrentScreen={setCurrentScreen} onLogin={handleLogin} />}
      {currentScreen === 'dashboard' && <Dashboard onLogout={handleLogout} />}
    </div>
  );
};

export default App;