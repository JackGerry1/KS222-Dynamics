// src/Pages/SignUp.js

// Import relevent react and firebase dependices alongside the addUsername function from the db.js file
// also imported the logo image
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { addUsername } from "../db"; 
import logoImage from "../Assets/Logo1.png";

function SignUp() {

  // states for username, email, password, tos checkbox and navigation hook
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [isChecked, setIsChecked] = useState(false); 
  const navigate = useNavigate(); 

  // Function to handle the sign-up process
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Creating a user using Firebase authentication
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);

      // Calling a function from the database module to add username linked to the user ID
      await addUsername(userInfo.user.uid, username);

      // If successful, navigate to the sign-in page or any other desired location
      navigate("/signin");
    } catch (error) {
      // Handle sign-up error
      console.error("Error signing up:", error.message);
    }
  }

  // Enable/disable the sign-up button based on form inputs and checkbox status
  const isSignUpDisabled = !isChecked || !email || !password || !username;

  return (
    // Container div with a "center" class to center the content
    <div className="center">
      {/* Link to the homepage */}
      <Link to="/">
        {/* Image logo for the app */}
        <img src={logoImage} alt="Logo" className="sign-logo" />
      </Link>
      {/* Title for the sign-up form */}
      <h1>Sign Up</h1>
      {/* Sign-up form */}
      <form>
        {/* Input field for username */}
        <div className="txt-field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username:</label>
        </div>
        {/* Input field for email */}
        <div className="txt-field">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> {/* end of txt-field */}
          <label>Email:</label>
        </div> 
        {/* Input field for password */}
        <div className="txt-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password:</label>
        </div> {/* end of txt-field */}
        {/* Checkbox to agree to Terms of Service */}
        <div className="signup-link">
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            I have read and agree to KS222 Dynamic Chat App's{" "}
            <Link to="/TOS">Terms of Service</Link>
          </label>
        </div> {/* end of signup-link */}
        {/* Button for submitting the sign-up form */}
        <button
          type="submit"
          onClick={handleSignUp} // Calls handleSignUp function on button click
          disabled={isSignUpDisabled} // Disables the button based on isSignUpDisabled state
        >
          Sign Up
        </button>
        {/* Link to the sign-in page */}
        <div className="signup-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div> {/* end of signup-link*/}
      </form>
    </div> // end of center
  );
}

// Exporting the SignUp component as default
export default SignUp;
