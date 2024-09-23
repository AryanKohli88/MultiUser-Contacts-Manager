import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Define styles
  const pageStyle = {
    backgroundColor: 'red',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  };

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px', // Increased padding
    width: '400px', // Increased width
    opacity: 0.8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px', // Increased gap
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%', // Full width of the box
    boxSizing: 'border-box', // Ensures padding is included in width
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%', // Full width of the box
  };

  const handleSignUp = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', username);
    const host = import.meta.env.VITE_BACKEND_HOST;

    try {
      const response = await fetch(`${host}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      
      if (response.status === 400) {
        alert('This email already has an account!');
        throw new Error('Login failed');
      }
      if (!response.ok) {
        throw new Error(response.message || 'Sign-up failed');
      }
      const data = await response.json();
      const { accessToken } = data;
      console.log(data);
      
      if (accessToken) {
        // Store the access token in a cookie
        Cookies.set('accessToken', accessToken, { expires: 1 }); // Expires in 1 day
        console.log('Access Token:', accessToken);
        // Optionally, redirect the user or perform further actions
        navigate('/userprofile');
      } else {
        console.error('No access token received');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  return (
    <div style={pageStyle}>
      <div style={boxStyle}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="youremail@domain.com"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          style={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          style={buttonStyle}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <Link to="/">Already have an account?</Link>
      </div>
    </div>
  );
}

export default SignUp;