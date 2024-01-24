// src/Pages/SignUp.js

// Import relevent react and firebase dependices alongside the addUsername function from the db.js file
// also imported the logo image
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import logoImage from "../Assets/Logo1.png";

// Function to handle for signup page
function SignUp() {
  // State variables
  const [, setErr] = useState(false);
  const [, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    setLoading(true); // Set loading state to true
    e.preventDefault(); // Prevent the default form submission behavior, which is refreshing page

    try {
      // Create user with provided email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      try {
        // Update user profile with provided username
        await updateProfile(res.user, {
          displayName: username,
          // photoURL: downloadURL, // Photo URL can be added if needed
        });

        // Create user document in firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          username,
          email,
          // photoURL: downloadURL, // Photo URL can be added if needed
        });

        // Create empty user chats document in firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});

        // Navigate to the sign-in page after successful signup
        navigate("/signin");

        // catch error when writing to database
      } catch (err) {
        console.log(err);
        setErr(true); 
        setLoading(false); 
      }

      // catch errors with attempting to create an user account
    } catch (err) {
      setErr(true); 
      setLoading(false); 
    }
  };
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
      <form onSubmit={handleSubmit}>
        {/* Input field for username */}
        <div className="txt-field">
          <input
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} // Add onChange for username
          />
          <label>Username</label>
        </div>
        {/* Input field for email */}
        <div className="txt-field">
          <input
            required
            type="text" // Fix type to "email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} // Add onChange for email
          />
          {/* end of txt-field */}
          <label>Email</label>
        </div>
        {/* Input field for password */}
        <div className="txt-field">
          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} // Add onChange for password
          />
          <label>Password</label>
        </div>{" "}
        {/* end of txt-field */}
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
        </div>{" "}
        {/* end of signup-link */}
        {/* Button for submitting the sign-up form */}
        <button disabled={isSignUpDisabled}>Sign up</button>
        {/* Link to the sign-in page */}
        <div className="signup-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>{" "}
        {/* end of signup-link*/}
      </form>
    </div> // end of center
  );
}

// Exporting the SignUp component as default
export default SignUp;
