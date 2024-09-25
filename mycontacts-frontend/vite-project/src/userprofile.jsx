import React, { useEffect, useState } from 'react';
import { fetchContacts, deleteContact, updateContact } from './api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CurrentUser from './components/currentuser';
import LogoutBtn from './components/logoutbutton';
import AddContact from './components/addcontact';

const UserProfile = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [editableContactId, setEditableContactId] = useState(null); // Track editable contact ID
  const [editableContactData, setEditableContactData] = useState({}); // Track editable contact data
  const [originalContactData, setOriginalContactData] = useState({}); // Store original data to revert

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

  // Listen for Escape key to revert changes and exit edit mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && editableContactId !== null) {
        // Revert changes and exit edit mode
        setEditableContactData(originalContactData);
        setEditableContactId(null);
      }
    };

    if (editableContactId !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editableContactId, originalContactData]);

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

  const handleEditContact = (contact) => {
    setEditableContactId(contact._id);
    setEditableContactData(contact); // Set contact data for editing
    setOriginalContactData(contact); // Store original data to revert if needed
  };

  const handleUpdateContact = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      alert("No token found!");
      navigate('/login');
      return;
    }

    try {
      await updateContact(editableContactId, editableContactData, token);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === editableContactId ? editableContactData : contact
        )
      );
      setEditableContactId(null); // Exit edit mode
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableContactData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <CurrentUser />
      <AddContact setContacts={setContacts} />
      {error && <p className="error-msg">{error}</p>}
      <h3>Your Contacts:</h3>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id} className="contact-item">
              {editableContactId === contact._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editableContactData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={editableContactData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editableContactData.phone}
                    onChange={handleChange}
                  />
                  <button className="save-button" onClick={handleUpdateContact}>Save</button>
                </>
              ) : (
                <>
                  <strong>{contact.name}</strong><br />
                  Email: {contact.email}<br />
                  Phone: {contact.phone}
                  <button className="update-button" onClick={() => handleEditContact(contact)}>Edit</button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteContact(contact._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <LogoutBtn />
    </div>
  );
};

export default UserProfile;
