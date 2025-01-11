import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../../types/User';
import { Button } from '@blueprintjs/core'; // Importing Blueprint's Button
import { IconNames } from '@blueprintjs/icons'; // Importing Icons for the button
import styles from './UsersButton.module.scss'

interface UserButtonProps {
    username: string;
    onClick: () => void;
}

const UsersButton: React.FC = () => {
  // State to store the list of users and to track loading state
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Async function to fetch users data
  const fetchUsers = async () => {
    setLoading(true); // Set loading to true when the request starts
    setError(''); // Reset error message before making the request

    try {
      // Make the GET request using axios
      const response = await axios.get('http://your-facade-service-url.com/api/users');
      
      // Once the response is received, update the users state with the data
      setUsers(response.data);
    } catch (err) {
      // Handle errors if the request fails
      setError('Error fetching users');
    } finally {
      // Set loading to false after the request is completed (whether successful or not)
      setLoading(false);
    }
  };
  const UserButton: React.FC<UserButtonProps> = ({ username, onClick }) => {
    return (
      <div>
        <Button 
          icon={IconNames.USER} // Blueprint Icon for User
          text={`Hello, ${username}`} // Display username
          intent="success" // Blueprint's styling options (primary, success, etc.)
          onClick={onClick} // Button onClick handler
        />
      </div>
    );
  };

  return (
    <div className='{styles.buttonContainer}'>
        <h2>Test</h2>
      <UserButton username='John Doe' onClick={() => alert('Hello, John Doe!')} />

      {/* Display error message if there was an issue with the request */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Display list of users if fetched successfully */}
      <div>
        <h3>Users List:</h3>
        {users.length > 0 ? (
          <ul>
            {users.map((user: User, index: number) => (
              <li key={index}>{user.name}</li> // Assuming 'name' is a field in the user object
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default UsersButton;