import React, { useState }  from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginPage() {
  // Define styles
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  // Initialize navigate function
  const navigate = useNavigate();

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

  const instructionsBoxStyle = {
    backgroundColor: '#f8f9fa',
    border: '2px solid black',
    borderRadius: '5px',
    padding: '15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#333',
    // width: '10%', // Ensure it takes full width of the container
  };

  const handleLogin = async () => {
    console.log('email:', email);
    console.log('Password:', password);
    const host = import.meta.env.VITE_BACKEND_HOST;
    try {
      const response = await fetch(`${host}/api/user/login`, {
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
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { accessToken } = data;

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
        <h2>Login</h2>
        <input type="text" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Password" value={password} style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={handleLogin} style={buttonStyle}>Login</button>
        <Link to="/NewUser">New User?</Link>
      <div style={instructionsBoxStyle}>
          <p>Test User email: email1 <br/> Test User password: password1  </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
