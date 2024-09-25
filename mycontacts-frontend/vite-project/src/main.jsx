import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './loginpage.jsx'
import SignUpPage from './signup.jsx'
import UserProfile from './userprofile.jsx'
import '../public/style.css'
import { createBrowserRouter, BrowserRouter as Router, Link, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App /></div>,
  },
  {
    path: "/login",
    element: <div><LoginPage /></div>,
  },
  {
    path: "/NewUser",
    element: <div><SignUpPage /></div>
  },
  {
    path: "/home",
    element: <div><UserProfile /></div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
