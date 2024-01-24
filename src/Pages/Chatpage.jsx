// Import necessary React and component dependencies
import React from "react";
import Sidebar from "../components/Sidebar"; 
import Chat from "../components/Chat"; 
import "../styles/Chat.css"; 

// Functional component for the Chat page
const Chatpage = () => {
  // Return JSX for rendering the Chat page
  return (
   // Root container for the Chat page */  
    <div className="chatpage"> 
      {/* Container for Sidebar and Chat components */}
      <div className="container"> 
        <Sidebar /> 
        <Chat /> 
      </div> {/* end of container */}
    </div> // end of chatpage
  );
};

// Export the Chatpage component for use in other parts of the application
export default Chatpage;
