// src/Pages/Chat.js
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


function Chat({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(user.auth);
      // If successful, navigate to home
      navigate("/signin");
    } catch (error) {
      // Handle logout error
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div className="center">
      <form>
        <h1>Welcome to the Chat</h1>
        <div className="signup-link">
          <p>You are logged in as: {user.email}</p>
        </div>
        <div className="signup-link">
        <Link to="/Settings">Settings</Link>
        </div>
        <div className="signup-link">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </form>
    </div>
      ) : (
        <Navigate to="/signin" />
      )}
    </div>
  );
}

export default Chat;
