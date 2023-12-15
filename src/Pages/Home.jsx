// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../Assets/Logo.png";

const Home = () => {
  return (
    <div>
      <Link to="/">
        <img src={logoImage} alt="Logo" className="home-logo" />
      </Link>
      <br />
      <Link to="/signin" className="button">
        Sign In
      </Link>
      <br />
      <Link to="/signup" className="button">
        Sign Up
      </Link>
    </div>
  );
};


export default Home;

