// src/Pages/SignIn.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import logoImage from "../Assets/Logo1.png";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInDisabled, setIsSignInDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSignInDisabled(!email || !password); // Disable button if email or password is empty
  }, [email, password]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, navigate to the chat page or any other desired location
      navigate('/chat');
    } catch (error) {
      // Handle sign-in error
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div className="center">
      <Link to="/">
        <img src={logoImage} alt="Logo" className="sign-logo" />
      </Link>
      <h1>Sign In</h1>
      <form>
        <div className="txt-field">
          <input
            type="text" // this is a bodge job fix later
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="txt-field">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <button
          type="submit"
          onClick={handleSignIn}
          disabled={isSignInDisabled}
        >
          Sign In
        </button>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;