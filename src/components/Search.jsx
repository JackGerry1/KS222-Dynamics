// Search.jsx

// import react and firebase functions, alongside contexts
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

// function to handle Search Component
const Search = () => {
  // State variables to manage username input, found user data, and error state
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Context variables for current user and chat context dispatch function
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Function to handle the search for a user
  const handleSearch = async () => {
    try {
      // Create a Firestore query to find users with the specified username
      // and make sure that it doesn't return the currentUser
      const q = query(
        collection(db, "users"),
        where("username", "==", username),
        where("uid", "!=", currentUser.uid)
      );

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Check if any users are found
      if (!querySnapshot.empty) {
        // Retrieve the first user's data
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
        setErr(false);
      } else {
        // Reset user data and set an error if no user is found
        setUser(null);
        setErr(true);
      }

      // error if the searching fails
    } catch (err) {
      console.error("Error searching for user:", err);
      setErr(true);
    }
  };

  // Function to handle the "Enter" key press for triggering the search
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // Function to handle the selection of a user for initiating a chat
  const handleSelect = async () => {
    // Ensure the selected user is not the current user
    if (user.uid === currentUser.uid) {
      // Display an error or handle the case where the user is trying to chat with themselves
      console.error("Cannot create a chat with yourself!");
      return;
    }

    // Check whether the group (chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      // Check if the chat document already exists if it does just get it
      const res = await getDoc(doc(db, "chats", combinedId));

      // if it does not exist
      if (!res.exists()) {
        // Create a chat in the "chats" collection, which will start as empt
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        /* 
        the below will create the following attributes into the userChats for the currentUser.uid and chosen user.uid

          UjHXGwDoM7r4nvYyNpU5zqIi8b1E1xpoLWvbnKgfcAZJmYlF6Yf28FKs (combined id of currentUser.uid and chosen user.uid)
        
            userInfo:

              uid: "UjHXGwDoM7r4nvYyNpU5zqIi8b1E" (string)
              username "bob" (string)
        */

        // Update user chats for current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            username: user.username,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // Update user chats for selected user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            username: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      // Set user information in the context
      // this is so that when the user clicks on the user they want to chat one is created
      // or they are taken to where their chat was left off
      dispatch({ type: "CHANGE_USER", payload: user });

      // catch any errors in this process
    } catch (err) {
      console.error(err);
    }

    // Reset user data and username input
    // this is just clearing the search field after a user has
    // clicked the user they want to chat with
    setUser(null);
    setUsername("");
  };

  // JSX content for the Search component
  return (
    // search bar rendering
    <div className="search">
      {/* Input field for typing the username to search */}
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div> {/* end of searchForm */}

      {/* Display an error message if the user is not found */}
      {err && <span className="error-message">User not found!</span>}

      {/* Display the found user if available */}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          {/* Placeholder for user's profile image */}
          <img src="" alt="" />
          <div className="userChatInfo">
            {/* Display the found user's username */}
            <span>{user.username}</span>
          </div> {/* end of userChatInfo */} 
        </div> // end of userChat
      )}
    </div> // end of search
  );
};


// Exporting the Search component as default
export default Search;
