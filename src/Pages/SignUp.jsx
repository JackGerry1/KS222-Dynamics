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
  const isSignUpDisabled = !isChecked || !email || !password || !username;

  return (
    <div className="center">
      <h2>Sign Up</h2>
      <form>
      <div className="txt-field">
      <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Username:</label>
      </div>
      <div className="txt-field">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email:</label>
      </div>
      <div className="txt-field">
      <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password:</label>
      </div>
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
      </div>
      <button
          type="submit"
          onClick={handleSignUp}
          disabled={isSignUpDisabled}
        >
          Sign Up
        </button>
        <div className="signup-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
