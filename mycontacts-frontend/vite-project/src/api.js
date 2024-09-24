// src/api.js
const API_BASE = import.meta.env.VITE_BACKEND_HOST;

// Function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }
  return data;
};

// Fetch Contacts Function
export const fetchContacts = async (token) => {
  const response = await fetch(`${API_BASE}/api/contacts/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};
export const fetchUser = async (token) => {
  const response = await fetch(`${API_BASE}/api/users/current`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};
export const addContact = async (contact, token) => {
  const response = await fetch(`${API_BASE}/api/contacts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(contact)
  });
  return handleResponse(response);
};

export const deleteContact = async (contactId, token) => {
  const response = await fetch(`${API_BASE}/api/contacts/${contactId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};
