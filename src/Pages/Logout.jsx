// src/Pages/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import auth from '../firebase';

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // You can redirect or handle success here
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Logout Page</h2>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}

export default Logout;
