// src/Pages/Settings.js

// Settings.jsx with the releavent react includes and the css files
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Settings.css";
import { changePageTitle } from "../components/Title";

// function to handle the settings page
const Settings = ({ user }) => {

  // Update page title
  changePageTitle('KS222-Settings');

  // State for toggling the settings visibility
  const [showSettings, setShowSettings] = useState(true);

  // function for the close buttons
  const handleSettingsClose = () => {
    // Hide the settings component
    setShowSettings(false);
    // Go back to the previous page using browser history
    window.history.back();
  };

  // Hide settings when not active
  if (!showSettings) return null;

  return (
    // Modal container so it popups instead of redirecting to a new page
    <div class="modal">
      {/* Content inside the modal is the settings page*/}
      <div class="modal-content">
        {/* Container for the close button */}
        <div class="close-button">
          <Link onClick={handleSettingsClose}>
            {/* Link wrapper for triggering the close action */}
            <span class="close-icon">&times;</span>

            {/* Text representation of the 'ESC' key/symbol */}
            <span class="close-text">ESC</span>
          </Link>
        </div>{" "}
        {/* end of close-button */}
        {/* Form for user settings */}
        <h2>Settings</h2>
        <form class="settings-form">
          {/* Column container for settings */}
          <div class="column">
            {/* Subtitle for the account settings */}
            <h3>Account Settings</h3>
            <label htmlFor="profilePic">Profile Picture:</label>
            {/* Label for profile picture input */}
            <div class="profile-picture">
              {/* Container for profile picture */}
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
              />
              {/* end of profile picture */}
            </div>{" "}
            {/* end of column */}
            <label for="displayName">Display Name:</label>
            {/* Label for display name input with text type and placeholder text*/}
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Change your display name"
            />
            {/* Label for email input with emaile type and placeholder text*/}
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Change your email"
            />
            {/* Title for the change password section */}
            <h3>Change Password</h3>
            <label for="password">Current Password:</label>
            {/* Label for current password input with type password and placeholder*/}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Current Password"
            />
            <label for="password">New Password:</label>
            {/* Label for new password input */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter New Password"
            />
            {/* Label for confirming new password input type password and placeholder*/}
            <label for="password">Confirm New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Confirm New Password"
            />
            {/* Change Password Button */}
            <div className="settings-content">
              <button class="change-button">Change Password</button>
            </div>{" "}
            {/* end of settings-content */}
          </div>{" "}
          {/* end of column */}
        </form>{" "}
        {/* end of settings-form */}
        <form class="settings-form">
          <div class="column">
            {/* Subtitle for the danger zone */}
            <h3>Danger Zone</h3>
            {/* Delete Account */}
            <div className="settings-content">
              <button class="delete-account-button">Delete Account</button>
            </div>
            {/* end of settings-content */}
          </div>
          {/* end of column */}
        </form>
        {/* end of settings-form */}
        <form class="settings-form">
          {/* Form for privacy settings */}
          <div class="column">
            {/* Column wrapper */}
            <h3>Privacy Settings</h3> {/* Title for privacy settings section */}
            {/* Dropdown to control who can contact */}
            <label for="contactControl">Control Who Can Contact You:</label>
            <select id="contactControl" name="contactControl">
              {/* Option for allowing everyone to contact */}
              <option value="everyone">Everyone</option>

              {/* Option for allowing friends only to contact */}
              <option value="friends">Friends Only</option>

              {/* Option for not allowing anyone to contact */}
              <option value="none">No One</option>
            </select>
            {/* Dropdown for status visibility */}
            <label for="statusVisibility">Status Visibility:</label>
            <select id="statusVisibility" name="statusVisibility">
              {/* Option for status visible to all */}
              <option value="visible">Visible to All</option>

              {/* Option for status visible to friends */}
              <option value="friends">Visible to Friends</option>

              {/* Option for hiding the status */}
              <option value="hidden">Hidden</option>
            </select>
            {/* Dropdown for setting status message */}
            <label for="statusMessage">Status Message:</label>
            <select id="statusVisibility" name="statusVisibility">
              {/* Option for online status */}
              <option value="Online">Online</option>

              {/* Option for offline status */}
              <option value="Offline">Offline</option>
            </select>
          </div>
          {/* end of column */}
        </form>
        {/* end of settings form */}
        {/* Form for notification and appearance settings */}
        <form className="settings-form">
          {/* Column wrapper */}
          <div className="column">
            {/* Title for settings section */}
            <h3>Notification & Appearance Settings</h3>
            {/* Row for enabling notifications */}
            <div className="form-row">
              {/* Label for notifications */}
              <label htmlFor="notifications">Enable Notifications:</label>

              {/* Checkbox to enable notifications */}
              <input type="checkbox" id="notifications" name="notifications" />
            </div>
            {/* Label for selecting the theme */}
            <label htmlFor="theme">Choose Theme:</label>
            {/* Dropdown for theme selection */}
            <select id="theme" name="theme">
              {/* Option for selecting the light theme */}
              <option value="light">Light Theme</option>

              {/* Option for selecting the dark theme */}
              <option value="dark">Dark Theme</option>
            </select>
            {/* Content wrapper */}
            <div className="settings-content">
              {/* Button to save changes */}
              <button class="change-button" onClick={handleSettingsClose}>
                Save Changes
              </button>
            </div>{" "}
            {/* end of settings-content */}
          </div>{" "}
          {/* end of column */}
        </form>{" "}
        {/* end of settings-form */}
      </div>{" "}
      {/* end of modal-content */}
    </div> // end of modal
  );
};

// Exporting the Settings component as default
export default Settings;
