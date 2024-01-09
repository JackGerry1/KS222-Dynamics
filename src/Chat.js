// Chat.js

// import the relevent react and firebase dependecies 
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Chat component managing user authentication
function Chat({ user }) {
  const navigate = useNavigate();

  // Effect hook to ensure the user is logged in, redirects to login page if not
  useEffect(() => {
    // Check if user is not logged in and redirect to sign-in page
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Attempt to sign out the current user using Firebase authentication
      await signOut(user.auth);
      // If logout is successful, navigate back to the sign-in page
      navigate("/signin");
    } catch (error) {
      // Handle any errors that occur during logout and log them
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {/* Conditional rendering based on user authentication */}
      {user ? (
        // Display when user is logged in
        <div className="center">
          <form>
            <h1>Welcome to the Chat</h1>
            {/* Display the user's email */}
            <div className="signup-link">
              <p>You are logged in as: {user.email}</p>
            </div>
            {/* Link to navigate to settings */}
            <div className="signup-link">
              <Link to="/Settings">Settings</Link>
            </div>
            {/* Button for user logout */}
            <div className="signup-link">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </form>
        </div>
      ) : (
        // Redirect to sign-in page if user is not logged in
        <Navigate to="/signin" />
      )}
    </div>
  );
}

// Exporting the Chat component as default
export default Chat;
