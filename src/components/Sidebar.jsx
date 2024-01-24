// Sidebar.jsx

// import react functions and components
import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import SidebarChats from "./SidebarChats";
import FooterSidebar from "./FooterSidebar";

// Function to handle for Sidebar page
const Sidebar = () => {
  return (
    // Main container for the sidebar
    <div className="sidebar">
      {/* Navigation bar component */}
      <Navbar />
      
      {/* Search component for searching chats */}
      <Search />
      
      {/* Component to display user chats in the sidebar */}
      <SidebarChats />
      
      {/* Footer component for additional sidebar content or actions */}
      <FooterSidebar />
    </div> // end of sidebar
  );
};

// Exporting the Sidebar component as default
export default Sidebar;
