// Home.jsx

// Imports for the relevent components and the logo image
import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../Assets/Logo.png";

// Functional component for the Home page
const Home = () => {
  return (
    <div>
      <div className="center-container">
        {/* Link to the home route */}
        <Link to="/">
          {/* Displaying the logo image */}
          <img src={logoImage} alt="Logo" className="home-logo" />
        </Link>

        {/* end of center-container div*/}
        {/* Link to the Sign In route */}
        <Link to="/signin" className="button">
          Sign In
        </Link>
        {/* Link to the Sign Up route */}
        <Link to="/signup" className="button">
          Sign Up
        </Link>
      </div>{" "}
    </div> // end of div
  );
};

// Exporting the Home component as default
export default Home;
