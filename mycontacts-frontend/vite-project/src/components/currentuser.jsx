import React, { useEffect, useState } from 'react';
import { fetchUser } from '../api'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function CurrentUser() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = async () => {
          const token = Cookies.get('accessToken');
          if (!token) {
            alert("didn't get token");
            navigate('/login');
            return;
          }
          try {
            const data = await fetchUser(token);
            setUsername(data.username);
          } catch (err) {
            setError(err.message);
            if (err.message === 'Unauthorized') {
              setUsername("NULL")
            }
          }
        };
        
        currentUser();
      }, [navigate]);
    
  return (
   <div>
      <h2>Welcome {username} !</h2>
    </div>
  );
}

export default CurrentUser;
