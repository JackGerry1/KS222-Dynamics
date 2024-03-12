import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmationPopUp";
import "../styles/Settings.css";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import {
  getAuth,
  deleteUser,
  updateProfile,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { db } from "../firebase";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { changePageTitle } from "../components/Title";

const Settings = () => {
  // State for toggling the settings visibility
  const [showSettings, setShowSettings] = useState(true);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const auth = getAuth();
  const userInfo = auth.currentUser;

  // various settings page erros
  const [displayNameError, setDisplayNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleteAccError, setDeleteAccError] = useState("");
  const [, setLoading] = useState(false);
  changePageTitle("KS222-Settings");

  // Function for handling the closing of the settings modal
  const handleSettingsClose = () => {
    setShowSettings(false);
    window.history.back();
  };

  // Hide settings when not active
  if (!showSettings) return null;

  // Function to change the display name
  const changeDisplayName = async (newDisplayName) => {
    // Check if the user is logged in
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if the new display name is not empty
    if (!newDisplayName) {
      setDisplayNameError("User Name Cannot Be Empty");
      return;
    }

    if (user) {
      // Update user profile display name
      await updateProfile(user, {
        displayName: newDisplayName,
      });
      console.log("Updated user profile display name: " + user.displayName);

      await updateDoc(doc(db, "users", user.uid), {
        username: newDisplayName,
      });
      console.log("Created new user document in Firestore");

      // Reference to the userChats collection
      const userChatsRef = collection(db, "userChats");

      // Get all documents in the userChats collection
      const userChatsSnapshot = await getDocs(userChatsRef);

      // Iterate through each document in the userChats collection
      userChatsSnapshot.forEach(async (doc) => {
        // Extract data from the document this is the uid of the userChat
        const data = doc.data();

        // Iterate through each key in the data object
        Object.keys(data).forEach(async (key) => {
          // Extract the nested object corresponding to the current key, which is the combinedId
          const nestedObject = data[key];

          // Check if the nested object is of type 'object' and if it can find the current users uid in any other records
          // this is to make sure it updates the username info with the other users they are chatting with
          if (
            typeof nestedObject === "object" &&
            user.uid === nestedObject.userInfo.uid
          ) {
            try {
              // Update the userInfo nested object with new user display name and keep the same user uid

              /*
              so the below code will update a new userInfo fields so it looks like this
              UjHXGwDoM7r4nvYyNpU5zqIi8b1E1xpoLWvbnKgfcAZJmYlF6Yf28FKs (combinedId):  
                userInfo:
                    uid: "UjHXGwDoM7r4nvYyNpU5zqIi8b1E" (string)
                    username "bob" (string)
              */

              await updateDoc(
                // Use doc.ref because doc is causing doc is not a function error
                doc.ref,
                {
                  [key + ".userInfo"]: {
                    uid: user.uid,
                    username: newDisplayName,
                    photoURL: user.photoURL,
                  },
                }
              );
              // catch any error
            } catch (error) {
              console.error("Error occurred while updating user data:", error);
              setDisplayNameError(
                "There was an error when changing display name."
              );
            }
          }
        });
      });
    }
  };

  // Function to change the profile picture
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        // Get the current user
        const user = auth.currentUser;

        // Get the reference to the current user's profile picture in Firebase Cloud Storage
        const storage = getStorage();

        // Delete the old profile picture object from Firebase Cloud Storage
        const profilePictureRef = ref(storage, user.photoURL);

        // Delete the file
        deleteObject(profilePictureRef)
          .then(() => {
            console.log("SUCCESFULLY DELETED OLD PROFILE PICTURE");
          })
          .catch((error) => {
            console.log("FAILURE TO DELETE OLD USER PROFILE PICTURE: " + error);
          });

        const date = new Date().getTime();
        // Create a storage reference for the new profile picture
        const newProfilePictureRef = ref(storage, `${uuid() + date}`);

        // Upload the new profile picture to Firebase Storage
        await uploadBytesResumable(newProfilePictureRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(newProfilePictureRef);

        // Update the user's profile with the new photoURL
        await updateProfile(user, {
          photoURL: downloadURL,
        });

        // Update the user's document in Firestore with the new photoURL
        await updateDoc(doc(db, "users", user.uid), {
          photoURL: downloadURL,
        });

        // Reference to the userChats collection
        const userChatsRef = collection(db, "userChats");

        // Get all documents in the userChats collection
        const userChatsSnapshot = await getDocs(userChatsRef);

        // Iterate through each document in the userChats collection
        userChatsSnapshot.forEach(async (doc) => {
          // Extract data from the document, which contains the user's chats
          const data = doc.data();

          // Iterate through each key in the data object (each key represents a chat room)
          Object.keys(data).forEach(async (key) => {
            // Extract the nested object corresponding to the current key (combinedId), which contains chat room details
            const nestedObject = data[key];

            // Check if the nested object is of type 'object' and if it contains user info with the current user's UID
            if (
              typeof nestedObject === "object" &&
              user.uid === nestedObject.userInfo.uid
            ) {
              try {
                // Update the userInfo nested object with the new user profile picture and keep the same user UID and username
                await updateDoc(doc.ref, {
                  [key + ".userInfo"]: {
                    uid: user.uid,
                    username: user.displayName, // Assuming user.displayName is already updated
                    photoURL: downloadURL, // Use the new profile picture downloadURL here
                  },
                });
              } catch (error) {
                console.error(
                  "Error occurred while updating user data:",
                  error
                );
                // Handle error if necessary
              }
            }
          });
        });
      } catch (error) {
        console.error("Error updating profile picture:", error);
        // Handle error if necessary
      } finally {
        setLoading(false);
      }
    }
  };

  // DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (user) {
        await deleteUser(user);
        console.log("User account deleted successfully");
        await deleteDoc(doc(db, "users", user.uid)); // Delete user document from Firestore
      } else {
        console.error("No user signed in");
      }
    } catch (error) {
      console.error("Error deleting user account:", error.message);
      setDeleteAccError("There was an error while deleting account.");
    }
  };

  // Change email
  const handleChangeEmail = async () => {
    const user = auth.currentUser;

    try {
      if (user) {
        await updateEmail(user, newEmail);
        console.log("Email changed successfully");
      } else {
        console.error("No user signed in");
      }
    } catch (error) {
      console.error("Error changing email:", error.message);
      setEmailError("There was an error while changing email.");
    }
  };

  // Change password
  const handleChangePassword = async () => {
    const user = auth.currentUser;

    // Check if the new display name is not empty
    if (!newPassword) {
      setPasswordError("Password Cannot Be Empty");
      return;
    }

    try {
      if (user) {
        await updatePassword(userInfo, newPassword);
        console.log("Password changed successfully");
      } else {
        console.error("No user signed in");
        setPasswordError("There was an error while changing password.");
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
      setPasswordError("There was an error while changing password.");
    }
  };

  return (
    // Modal container so it pops up instead of redirecting to a new page
    <div className="modal">
      {/* Content inside the modal is the settings page*/}
      <div className="modal-content">
        {/* Container for the close button */}
        <div className="close-button">
          <Link onClick={handleSettingsClose}>
            {/* Link wrapper for triggering the close action */}
            <span className="close-icon">&times;</span>

            {/* Text representation of the 'ESC' key/symbol */}
            <span className="close-text">ESC</span>
          </Link>
        </div>{" "}
        {/* end of close-button */}
        {/* Form for user settings */}
        <h2>Settings</h2>
        <div className="settings-form">
          {/* Column container for settings */}
          <div className="column">
            {/* Subtitle for the account settings */}
            <h3>Account Settings</h3>
            {/* Label for profile picture input */}
            <div className="profile-picture">
              {/* Use userInfo.photoURL as the src attribute */}
              <img src={userInfo?.photoURL} alt="Profile_IMG" />
              {/* Container for profile picture */}
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept=".jpg, .jpeg, .png"
                onChange={handleProfilePictureChange}
              />
              {/* end of profile picture */}
            </div>{" "}
            {/* end of column */}
            <label htmlFor="displayName">
              Display Name: {userInfo?.displayName}
            </label>
            {/* Label for display name input with text type and placeholder text*/}
            <form
              className="settings-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newDisplayName">New Display Name:</label>
              <input
                type="text"
                id="newDisplayName"
                name="newDisplayName"
                placeholder="Enter new display name"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
              <button onClick={() => changeDisplayName(newDisplayName)}>
                Change Display Name
              </button>
              {displayNameError && (
                <p className="error-message">{displayNameError}</p>
              )}
            </form>
            {/* Label for email input with email type and placeholder text*/}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Change your email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <button
              className="change-button"
              onClick={() => handleChangeEmail(newEmail)}
            >
              Change Email
            </button>
            {emailError && <p className="error-message">{emailError}</p>}
            {/* Title for the change password section */}
            <h3>Change Password</h3>
            <label htmlFor="newPassword">New Password:</label>
            {/* Label for new password input */}
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {/* Change Password Button */}
            <div className="settings-content">
              <button
                className="change-button"
                onClick={() => handleChangePassword(newPassword)}
              >
                Change Password
              </button>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>{" "}
            {/* end of settings-content */}
          </div>{" "}
          {/* end of column */}
        </div>{" "}
        {/* end of settings-form */}
        <form className="settings-form">
          <div className="column">
            {/* Subtitle for the danger zone */}
            <h3>Danger Zone</h3>
            {/* Delete Account */}
            <div className="settings-content">
              <DeleteConfirmation onDelete={handleDeleteAccount} />
              {deleteAccError && (
                <p className="error-message">{deleteAccError}</p>
              )}
            </div>
            {/* end of settings-content */}
          </div>
          {/* end of column */}
        </form>
        {/* end of settings-form */}
        <form className="settings-form">
          {/* Form for privacy settings */}
          <div className="column">
            {/* Column wrapper */}
            <h3>Privacy Settings</h3> {/* Title for privacy settings section */}
            {/* Dropdown to control who can contact */}
            <label htmlFor="contactControl">Control Who Can Contact You:</label>
            <select id="contactControl" name="contactControl">
              {/* Option for allowing everyone to contact */}
              <option value="everyone">Everyone</option>

              {/* Option for allowing friends only to contact */}
              <option value="friends">Friends Only</option>

              {/* Option for not allowing anyone to contact */}
              <option value="none">No One</option>
            </select>
            {/* Dropdown for status visibility */}
            <label htmlFor="statusVisibility">Status Visibility:</label>
            <select id="statusVisibility" name="statusVisibility">
              {/* Option for status visible to all */}
              <option value="visible">Visible to All</option>

              {/* Option for status visible to friends */}
              <option value="friends">Visible to Friends</option>

              {/* Option for hiding the status */}
              <option value="hidden">Hidden</option>
            </select>
            {/* Dropdown for setting status message */}
            <label htmlFor="statusMessage">Status Message:</label>
            <select id="statusMessage" name="statusMessage">
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
              <button className="change-button" onClick={handleSettingsClose}>
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
    </div>
  );
};

export default Settings;
