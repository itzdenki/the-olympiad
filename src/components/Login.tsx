import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

interface LoginProps {
    setCurrentScreen: (screen: string) => void;
    onLogin: () => void;
  }
  
  const Login: React.FC<LoginProps> = ({ setCurrentScreen, onLogin }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState('');
  
    const handleLogin = async () => {
      if (!recaptchaValue) {
        toast.error('Please complete the reCAPTCHA verification.');
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:5000/users', {
          params: {
            q: identifier,
          },
        });
  
        const user = response.data.find((user: any) => user.password === password);
        if (user) {
          onLogin();
        } else {
          toast.error('Invalid credentials!');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        toast.error('Error logging in. Please try again.');
      }
    };
  
    const handleRecaptchaChange = (value: string | null) => {
      setRecaptchaValue(value || '');
    };
  
    return (
      <div className="container">
        <h2>Login</h2>
        <input type="text" placeholder="Username/Email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <ReCAPTCHA
          sitekey="6LeQnOgpAAAAABDfwk8TsJ9VU3RFjpAk1lk6ldkH"
          onChange={handleRecaptchaChange}
        />
        <button className="login" onClick={handleLogin}>Login</button>
        <button className="back" onClick={() => setCurrentScreen('home')}>Back</button>
      </div>
    );
  };
  
  export default Login;