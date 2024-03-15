// Navbar.jsx

// import react and firebase functions, alongside contexts and incons
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import logoutIcon from "../Assets/logoutIcon.png";

// function to handle Navbar Component
const Navbar = () => {
  // Access user authentication and chat context
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase authentication
      await signOut(auth);

      // Reset ChatContext to initial state (user information)
      dispatch({ type: "CHANGE_USER", payload: null });
    } catch (error) {
      // Handle errors if any during the logout process
      console.error("Error logging out:", error);
    }
  };

  // JSX content for the Navbar component
  return (
    // navbar div container
    <div className="navbar">
      {/* Application logo */}
      <span className="logo">Dynamic Chat App</span>
      {/* User section with display name, profile picture, and logout button */}
      <div className="user">
        {/* OPTIONAL TODO: user profile picture displayed here, something like {currentUser.profilePic} */}
        <span style={{ marginTop: "5px" }}>{currentUser?.displayName}</span>
        <img src={currentUser?.photoURL} alt="" />

        {/* Display the user's name */}

        {/* Logout button with logout icon */}
        <img
          src={logoutIcon}
          alt=""
          className="settings-logo"
          onClick={handleLogout}
        />
      </div>{" "}
      {/* end of user */}
    </div> // end of navbar container
  );
};

// Exporting the Navbar component as default
export default Navbar;
