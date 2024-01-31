// src/Pages/SignIn.js

// Import necessary modules and dependencies, alongside firebase auth and logo
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import logoImage from "../Assets/Logo1.png";
import ReCAPTCHA from "react-google-recaptcha";

// Function to handle for signup page
function SignIn() {
  // State variables to manage email, password, and button disablement
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInDisabled, setIsSignInDisabled] = useState(true);
  const [reCAPTCHAToken, setReCAPTCHAToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      // Check if ReCAPTCHA token is available
      if (!reCAPTCHAToken) {
        // Error message dispayed if token not availble
        setErrorMessage("Please complete the ReCAPTCHA.");
        return; // Prevent sign-in if ReCAPTCHA token is not available
      }

      // Attempt sign-in using Firebase auth with provided email and password
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, navigate to the chat page or any other desired location
      navigate("/chatpage");
    } catch (error) {
      // Handle sign-in error, log the error message to the console
      console.error("Error signing in:", error.message);
    }
  };
    // Function to handle sign-in with Google account
    const handleGoogleSignIn = async () => {
      try {
        // Check if ReCAPTCHA token is available
        if (!reCAPTCHAToken) {
          // Error message dispayed if token not availble
          setErrorMessage("Please complete the ReCAPTCHA.");
          return; // Prevent sign-in if ReCAPTCHA token is not available
        }
        // Create a GoogleAuthProvider instance
        const googleProvider = new GoogleAuthProvider();
  
        // Launch Google Sign-In this will pop-up and prompt user to sign-in with google
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
    
        // Create or update user document in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          username: user.displayName, // Use Google display name as username
          email: user.email,
          // photoURL: user.photoURL, // Photo URL can be added if needed
        });
    
        // Create empty user chats document in firestore
        await setDoc(doc(db, "userChats", user.uid), {});
        // Navigate to the chat page after successful signing up with google account credentials 
        navigate("/chatpage");
      } catch (error) {
        // Handle Google sign-in error, log the error message to the console
        console.error("Error signing in with Google:", error.message);
      }
    };
    
      // Function to handle ReCAPTCHA completion
      // This function sets a token when recaptcha is completed
      const handleReCAPTCHAChange = (token) => {
        // The token has to be set to allow the user to login
        setReCAPTCHAToken(token);
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
        </div>{" "}
        {/* end of txt-field */}
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
        </div>{" "}
        {/* end of txt-field */}
        {/* Sign-in button */}
        <button
          type="submit"
          onClick={handleSignIn} // Function to handle sign-in
          disabled={isSignInDisabled} // Disable button based on condition
        >
          Sign In
        </button>
        {/* Additional Google Sign-in button */}
        <button onClick={handleGoogleSignIn}>
        Sign In with Google
        </button>
        {/* ReCAPTCHA entry box */}
        <ReCAPTCHA sitekey="6Le1HzYfAAAAAP9SdeuzJ7GDta-hWegd8lpABac1" onChange={handleReCAPTCHAChange} />
        {/* ReCAPTCHA error message displayed if ReCAPTCHA not completed*/}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* Link to the signup page */}
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>{" "}
        {/* end of signup-link */}
      </form>
    </div> // end of center
  );
}

// Exporting the SignIn component as default
export default SignIn;
