// App.js

// import the relevent react dependices alongside all of the page components
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Chat from "./Chat";
import TOS from "./Pages/TOS";
import Settings from "./Pages/Settings";


function App() {
  // create a unautorised user to start with
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
        <Routes>
          {/* Default route leads to Home */}
          <Route path="/" element={<Home />} />

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
                <Navigate to="/signin" />
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
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Exporting the App component as default
export default App;

