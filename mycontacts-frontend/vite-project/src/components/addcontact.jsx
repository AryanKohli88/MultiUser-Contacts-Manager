import React, { useEffect, useState } from 'react';
import { addContact } from '../api'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddContact(props) {
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
      };
    
    const handleAddContact = async (e) => {
    e.preventDefault();
    const token = Cookies.get('accessToken');
    if (!token) {
        alert("No token found!");
        navigate('/login');
        return;
    }

    try {
        const addedContact = await addContact(newContact, token);
        props.setContacts((prevContacts) => [...prevContacts, addedContact]);
        setNewContact({ name: '', email: '', phone: '' }); // Reset form
        setIsModalOpen(false); // Close modal after submission
    } catch (err) {
        alert(err.message);
        setError(err.message);
    }
    };
    
    return (
   <div>
    <button onClick={() => setIsModalOpen(true)} className='add-button'>Add Contact</button>
    {isModalOpen && (
    <div className="modal">
        <div className="modal-content">
        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
        <h3>Add a New Contact</h3>
        <form onSubmit={handleAddContact}>
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={newContact.name}
            onChange={handleChange}
            required
            />
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={newContact.email}
            onChange={handleChange}
            required
            />
            <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={newContact.phone}
            onChange={handleChange}
            required
            />
            <button type="submit" className='add-button'>Add Contact</button>
        </form>
        </div>
    </div>
    )}
   </div>
  );
}

export default AddContact;



{/* Modal for Adding Contact */}
