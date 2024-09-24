// src/userprofile.jsx
import React, { useEffect, useState } from 'react';
import { fetchContacts, deleteContact} from './api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CurrentUser from './components/currentuser';
import LogoutBtn from './components/logoutbutton';
import AddContact from './components/addcontact';

const UserProfile = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  // Fetch contacts on component mount
  useEffect(() => {
    const getContacts = async () => {
      const token = Cookies.get('accessToken');
      if (!token) {
        alert("didn't get token");
        navigate('/login');
        return;
      }
      try {
        const data = await fetchContacts(token);
        setContacts(data);
      } catch (err) {
        setError(err.message);
        if (err.message === 'Unauthorized') {
          navigate('/login');
        }
      }
    };

    getContacts();
  }, [navigate]);


  const handleDeleteContact = async (contactId) => {
    const token = Cookies.get('accessToken');
    if (!token) {
      alert("No token found!");
      navigate('/login');
      return;
    }

    try {
      await deleteContact(contactId, token);
      setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== contactId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile-container">
      <CurrentUser />
      <AddContact setContacts={setContacts}/>
      {error && <p className="error-msg">{error}</p>}
      <h3>Your Contacts:</h3>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id} className="contact-item">
              <strong>{contact.name}</strong><br />
              Email: {contact.email}<br />
              Phone: {contact.phone}
              <button 
                className="delete-button" 
                onClick={() => handleDeleteContact(contact._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    <LogoutBtn />  
    </div>
  );
};

export default UserProfile;
