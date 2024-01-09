// src/Pages/SignIn.js

// Import necessary modules and dependencies, alongside firebase auth and logo
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
import logoImage from "../Assets/Logo1.png"; 

function SignIn() {
  // State variables to manage email, password, and button disablement
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInDisabled, setIsSignInDisabled] = useState(true);

  // Navigation hook from React Router
  const navigate = useNavigate(); 

  // Effect to enable/disable sign-in button based on email and password state
  useEffect(() => {
    setIsSignInDisabled(!email || !password);
  }, [email, password]);

  // Function to handle sign-in attempt
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Attempt sign-in using Firebase auth with provided email and password
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, navigate to the chat page or any other desired location
      navigate("/chat");
    } catch (error) {
      // Handle sign-in error, log the error message to the console
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="center">
      {/* Logo linking to the home page */}
      <Link to="/">
        <img src={logoImage} alt="Logo" className="sign-logo" />
      </Link>
      {/* Signin header */}
      <h1>Sign In</h1>
      <form>
        {/* Input field for email */}
        <div className="txt-field">
          <input
            type="text" // Temporary fix - Update the input type later
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)} // Set email state on change
          />
          <label>Email</label>
        </div> {/* end of txt-field */}
        {/* Input field for password */}
        <div className="txt-field">
          <input
            type="password"
            placeholder="Password"
            required
            value={password} // Password input value
            onChange={(e) => setPassword(e.target.value)} // Set password state on change
          />
          <label>Password</label>
        </div> {/* end of txt-field */}
        {/* Sign-in button */}
        <button
          type="submit"
          onClick={handleSignIn} // Function to handle sign-in
          disabled={isSignInDisabled} // Disable button based on condition
        >
          Sign In
        </button>
        {/* Link to the signup page */}
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div> {/* end of signup-link */}
      </form> 
    </div> // end of center
  );
}

// Exporting the SignIn component as default
export default SignIn;
