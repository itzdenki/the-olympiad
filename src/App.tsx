import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';
import Account  from './components/Account.tsx';
import './App.css'

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  const handleLogin = (userId: number) => {
    setIsLoggedIn(true);
    setLoggedInUserId(userId);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUserId(null);
    setCurrentScreen('home');
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <div className="header">
        <div className="nav-left">
          <a href="#" onClick={() => setCurrentScreen('home')}>Home</a>
          <a href="#" onClick={() => setCurrentScreen('rules')}>Rules</a>
          <a href="#" onClick={() => setCurrentScreen('myteam')}>My Team</a>
        </div>
        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <a href="#" onClick={() => setCurrentScreen('account')}>Account</a>
              <a href="#" onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <>
              <a href="#" onClick={() => setCurrentScreen('register')}>Register</a>
              <a href="#" onClick={() => setCurrentScreen('login')}>Login</a>
            </>
          )}
        </div>
      </div>
      <div className="container">
        {currentScreen === 'home' && <h1>Welcome to Our App</h1>}
        {currentScreen === 'rules' && <h1>Rules</h1>}
        {currentScreen === 'myteam' && <h1>My Team</h1>}
        {currentScreen === 'register' && <Register setCurrentScreen={setCurrentScreen} />}
        {currentScreen === 'login' && <Login setCurrentScreen={setCurrentScreen} onLogin={handleLogin} />}
        {currentScreen === 'dashboard' && <Dashboard onLogout={handleLogout} />}
        {currentScreen === 'account' && loggedInUserId !== null && <Account userId={loggedInUserId} onLogout={handleLogout} />}
      </div>
    </div>
  );
};

export default App;