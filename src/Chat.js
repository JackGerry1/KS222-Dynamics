// src/Pages/Chat.js
import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Chat({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(user.auth);
      // If successful, navigate to the main page (App.js)
      navigate('/');
    } catch (error) {
      // Handle logout error
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div>
      <h2>Welcome to the Chat</h2>
      {user ? (
        <div>
          <p>You are logged in as: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in to access the chat.</p>
          <p>Redirecting to login page...</p>
        </div>
      )}
    </div>
  );
}

export default Chat;

