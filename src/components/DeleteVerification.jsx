import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

const DeleteVerification = ({ username }) => {
  console.log('Username:', username);
  const [userExists, setUserExists] = useState(null);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        setUserExists(!querySnapshot.empty);
      } catch (error) {
        console.error('Error checking user existence:', error);
      }
    };

    checkUserExists();
  }, [username]);

  return (
    <div>
      {userExists === true && <p></p>}
      {userExists === false && <p>User has left platform!</p>}
    </div>
  );
};

export default DeleteVerification;

