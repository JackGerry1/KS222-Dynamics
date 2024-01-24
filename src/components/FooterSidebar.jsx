// FooterSidebar.jsx

// import reactfunctions and icons
import React from "react";
import { Link } from "react-router-dom";
import settings_icon from "../Assets/settings_icon.png";
import FAQIcon from "../Assets/FAQ.png";

// FooterSidebar component providing links to Settings and displaying FAQIcon
const FooterSidebar = () => {
  return (
    // Container for the footer section
    <div className="footer">
      <div className="footer-content">
        {/* Link to the Settings page */}
        <Link to="/Settings">
          {/* Settings icon image */}
          <img
            src={settings_icon}
            alt="settings_icon"
            className="settings-logo"
          />
        </Link>
        
        {/* Regular image without a link */}
        <Link>
          {/* FAQ icon image */}
          <img src={FAQIcon} alt="FAQIcon" className="settings-logo" />
        </Link>
      </div> {/* end of footer-content */}
    </div> // end of footer 
  );
};

// Exporting the FooterSidebar component as default
export default FooterSidebar;

