import React, { useState, useEffect, useContext } from 'react';
import { db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ChatContext } from "../context/ChatContext";



const DeleteVerification = () => {
  const { data } = useContext(ChatContext);
  // console.log('UID:', data.user.uid);
  const [userExists, setUserExists] = useState(null);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', data.user.uid));
        const querySnapshot = await getDocs(q);
        setUserExists(!querySnapshot.empty);
      } catch (error) {
        console.error('Error checking user existence:', error);
      }
    };

    checkUserExists();
  }, [data.user.uid]);

  return (
    <div>
      {userExists === true && <p></p>}
      {userExists === false && <p>User has left platform!</p>}
    </div>
  );
};

export default DeleteVerification;

