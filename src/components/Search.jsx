// Search.jsx

import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username),
        where("uid", "!=", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const foundUsers = [];

      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((doc) => {
          const userData = doc.data();
          foundUsers.push(userData);
        });

        setUsers(foundUsers);
        setErr(false);
      } else {
        setUsers([]);
        setErr(true);
      }
    } catch (err) {
      console.error("Error searching for user:", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (selectedUser) => {
    if (selectedUser.uid === currentUser.uid) {
      console.error("Cannot create a chat with yourself!");
      return;
    }

    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            username: selectedUser.username,
            photoURL: selectedUser.photoURL, // Pass the photoURL here
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            username: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      dispatch({ type: "CHANGE_USER", payload: selectedUser });
    } catch (err) {
      console.error(err);
    }

    setUsers([]);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span className="error-message">User not found!</span>}
      {users.length > 0 && (
        <div className="userList">
          {users.map((userData) => (
            <div
              key={userData.uid}
              className="userChat"
              onClick={() => handleSelect(userData)}
            >
              <img src={userData.photoURL} alt="" />{" "}
              {/* Render the user's photoURL */}
              <div className="userChatInfo">
                <span>{userData.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
