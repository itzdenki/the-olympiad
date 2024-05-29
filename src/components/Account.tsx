import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

interface AccountProps {
  userId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  firstName?: string;
  lastName?: string;
}

const Account: React.FC<AccountProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [editingFirstName, setEditingFirstName] = useState(false);
  const [editingLastName, setEditingLastName] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Error fetching user data. Please try again.');
      }
    };
    fetchUser();
  }, [userId]);

  const handleFirstNameSave = async () => {
    if (user) {
      try {
        const updatedUser = { ...user, firstName: newFirstName };
        await axios.put(`http://localhost:5000/users/${userId}`, updatedUser);
        setUser(updatedUser);
        setEditingFirstName(false);
        toast.success('First name updated successfully.');
      } catch (error) {
        console.error('Error updating first name:', error);
        toast.error('Error updating first name. Please try again.');
      }
    }
  };

  const handleLastNameSave = async () => {
    if (user) {
      try {
        const updatedUser = { ...user, lastName: newLastName };
        await axios.put(`http://localhost:5000/users/${userId}`, updatedUser);
        setUser(updatedUser);
        setEditingLastName(false);
        toast.success('Last name updated successfully.');
      } catch (error) {
        console.error('Error updating last name:', error);
        toast.error('Error updating last name. Please try again.');
      }
    }
  };

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      {user ? (
        <div>
          <p>
            <strong>First Name:</strong>
            {editingFirstName ? (
              <>
                <input
                  type="text"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                />
                <button onClick={handleFirstNameSave}>Save</button>
                <button onClick={() => setEditingFirstName(false)}>Cancel</button>
              </>
            ) : (
              <>
                {user.firstName || 'Setup your first name'}
                <button onClick={() => setEditingFirstName(true)}>Edit</button>
              </>
            )}
          </p>
          <p>
            <strong>Last Name:</strong>
            {editingLastName ? (
              <>
                <input
                  type="text"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                />
                <button onClick={handleLastNameSave}>Save</button>
                <button onClick={() => setEditingLastName(false)}>Cancel</button>
              </>
            ) : (
              <>
                {user.lastName || 'Setup your last name'}
                <button onClick={() => setEditingLastName(true)}>Edit</button>
              </>
            )}
          </p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
};

export default Account;