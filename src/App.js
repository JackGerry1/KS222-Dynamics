//App.js

//imports of necessary components and functions
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import Link
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Chat from "./Chat";
import TOS from "./Pages/TOS";
import Settings from "./Pages/Settings";

function App() {
  //useState allows functional components to have states, in a react friendly way
  //useState is a react hook that takes two values in our case the user and a function to change the users state
  //setUser is a react function that allows you to change the users state this will be used to identify that user is logged in
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser); // Update user state with the authenticated user
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
      <h2>Welcome to the KS222 Dynamics</h2>
        {/* Navigation bar with links */}
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes and their corresponding components */}
        <Routes>
          {/* Route for Sign In page */}
          <Route path="/signin" element={<SignIn />} />

          {/* Route for Sign Up page */}
          <Route path="/signup" element={<SignUp />} />

          {/* Route for TOS page */}
          <Route path="/TOS" element={<TOS />} />

          {/* Route for Chat page with conditional rendering based on authentication */}
          <Route
            path="/chat"
            element={
              user ? (
                <Chat user={user} />
              ) : (
                <p>Please sign in to access the chat.</p>
              )
            }
          />
          {/* Route for Settings page with conditional rendering based on authentication */}
          <Route
            path="/Settings"
            element={
              user ? (
                <Settings user={user} />
              ) : (
                <p>Please sign in to access the chat.</p>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
