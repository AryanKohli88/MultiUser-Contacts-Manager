import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LogoutBtn() {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    };

      return (
   <div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default LogoutBtn;
