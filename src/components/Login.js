import React, { useState } from 'react';
import './Form.css'; 
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'dotenv/config'

const Login = ({ onLoginSuccess, onBack }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleLogin = async () => {
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA');
      return;
    }

    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();

    const user = users.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (user) {
      onLoginSuccess();
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username or Email" 
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ReCAPTCHA
        sitekey={process.env.CAPTCHA_KEY}
        onChange={value => setRecaptchaValue(value)}
      />
      <div className="button-group">
        <button onClick={handleLogin}>Login</button>
        <button onClick={onBack}>Quay lại</button>
      </div>
    </div>
  );
};

export default Login;
