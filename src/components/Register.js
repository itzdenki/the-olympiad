import React, { useState } from 'react';
import './Form.css'; 
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'dotenv/config'

const Register = ({ onRegisterSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA');
      return;
    }

    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, recaptchaValue })
    });

    if (response.ok) {
      onRegisterSuccess();
    } else {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <ReCAPTCHA
        sitekey={process.env.CAPTCHA_KEY}
        onChange={value => setRecaptchaValue(value)}
      />
      <div className="button-group">
        <button onClick={handleRegister}>Register</button>
        <button onClick={onBack}>Quay lại</button>
      </div>
    </div>
  );
};

export default Register;
