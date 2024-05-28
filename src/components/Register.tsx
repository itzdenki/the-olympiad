import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

interface RegisterProps {
    setCurrentScreen: (screen: string) => void;
  }
  
  const Register: React.FC<RegisterProps> = ({ setCurrentScreen }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState('');
  
    const handleRegister = async () => {
      if (!recaptchaValue) {
        toast.error('Please complete the reCAPTCHA verification.');
        return;
      }
  
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
  
      // Email validation regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        toast.error('Invalid email format!');
        return;
      }
  
      try {
        await axios.post('http://localhost:5000/users', {
          username,
          email,
          password,
          recaptchaValue,
        });
        setCurrentScreen('login');
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Error registering user. Please try again.');
      }
    };
  
    const handleRecaptchaChange = (value: string | null) => {
      setRecaptchaValue(value || '');
    };
  
    return (
      <div className="container">
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <ReCAPTCHA
          sitekey="6LeQnOgpAAAAABDfwk8TsJ9VU3RFjpAk1lk6ldkH"
          onChange={handleRecaptchaChange}
        />
        <button className="register" onClick={handleRegister}>Register</button>
        <button className="back" onClick={() => setCurrentScreen('home')}>Back</button>
      </div>
    );
  };
  
  export default Register;