// src/Pages/SignUp.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { addUsername } from "../db";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Creating the user
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);

      // links the db.js - This is used to get and store the username/userID
      await addUsername(userInfo.user.uid, username);

      // If successful, navigate to the sign-in page or any other desired location
      navigate("/signin");
    } catch (error) {
      // Handle sign-up error
      console.error("Error signing up:", error.message);
    }
  };

  // Enable/disable the sign-up button based on form inputs and checkbox status
  const isSignUpDisabled = !isChecked || !email || !password;

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
      <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <br />
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          I have read and agree to KS222 Dynamic Chat App's <Link to="/TOS">Terms of Service</Link>
        </label>
        <br />
        <button
          type="button"
          onClick={handleSignUp}
          disabled={isSignUpDisabled}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;
