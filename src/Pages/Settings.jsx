// Settings.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "../Settings.css";

const Settings = ({ user }) => {
  const [showSettings, setShowSettings] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleSettingsClose = () => {
    setShowSettings(false);
    window.history.back(); // Go back to the previous page
  };

  if (!showSettings) return null; // Hide settings when not active

  return (
    <div class="modal">
      <div class="modal-content">
        <div class="close-button">
          <Link onClick={handleSettingsClose}>
            <span class="close-icon">&times;</span>
            <span class="close-text">ESC</span>
          </Link>
        </div>
        <h2>Settings</h2>
        <form class="settings-form">
          <div class="column">
            <h3>Account Settings</h3>
            <label htmlFor="profilePic">Profile Picture:</label>
            <div class="profile-picture">
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
              />
            </div>
            <label for="displayName">Display Name:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Change your display name"
            />
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Change your email"
            />

            <h3>Change Password</h3>
            <label for="password">Current Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Current Password"
            />
            <label for="password">New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter New Password"
            />
            <label for="password">Confirm New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Confirm New Password"
            />
            <div className="settings-content">
              <button class="change-button">Change Password</button>
            </div>
          </div>
        </form>
        <form class="settings-form">
          <div class="column">
            <h3>Danger Zone</h3>
            <div className="settings-content">
              <button class="delete-account-button">Delete Account</button>
            </div>
          </div>
        </form>
        <form class="settings-form">
          <div class="column">
            <h3>Privacy Settings</h3>
            <label for="contactControl">Control Who Can Contact You:</label>
            <select id="contactControl" name="contactControl">
              <option value="everyone">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="none">No One</option>
            </select>
            <label for="statusVisibility">Status Visibility:</label>
            <select id="statusVisibility" name="statusVisibility">
              <option value="visible">Visible to All</option>
              <option value="friends">Visible to Friends</option>
              <option value="hidden">Hidden</option>
            </select>
            <label for="statusMessage">Status Message:</label>
            <select id="statusVisibility" name="statusVisibility">
              <option value="visible">Online</option>
              <option value="friends">Offline</option>
            </select>
          </div>
        </form>
        <form className="settings-form">
          <div className="column">
            <h3>Notification & Appearance Settings</h3>
            <div className="form-row">
              <label htmlFor="notifications">Enable Notifications:</label>
              <input type="checkbox" id="notifications" name="notifications" />
            </div>
            <label for="theme">Choose Theme:</label>
            <select id="theme" name="theme">
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
            </select>
            <div className="settings-content">
              <button class="change-button" onClick={handleSettingsClose}>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
