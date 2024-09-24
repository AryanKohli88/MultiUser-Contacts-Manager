import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import TestUserDetails from './components/testuserdetails';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const host = import.meta.env.VITE_BACKEND_HOST;
    try {
      const response = await  fetch(`${host}/api/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        alert('Invalid Credentials!');
        throw new Error('Login failed');
      }
      if (!response.ok) {
        alert(`${response}`);
        return;
      }
      const data = await response.json();
      const { accessToken } = data;

      if (accessToken) {
        Cookies.set('accessToken', accessToken, { expires: 1 });
        navigate('/home');
      } else {
        setError('No access token received')
        console.error(error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/NewUser">Sign Up</Link>
      </p>
    <TestUserDetails />
    </div>
  );
};

export default LoginPage;
