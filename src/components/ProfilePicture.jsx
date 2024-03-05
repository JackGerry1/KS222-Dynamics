// src/components/ProfilePicture.jsx

// ProfilePicture.jsx with the releavent react includes and the css files
import "../styles/Settings.css";
import profileImage from '../Assets/profileDefault.png';
import { useEffect, useState } from "react";
import { auth, upload } from "../firebase";

// Profile function
export default function Profile() {
    // Get current user information auth
    const currentUser = auth.currentUser;
    
    const [photo, setPhoto] = useState(null); // State for selected photo
    const [loading, setLoading] = useState(false); // State for loading status
    
    const [photoURL, setPhotoURL] = useState(profileImage); // State for profile picture URL, set default image

    // Function to handle when file (new image) is selected
    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    // Function to handle upload button click
    function handleClick() {
        upload(photo, currentUser, setLoading); //Uploads selected photo
    }

    // Effect hook to update profile picture URL when currentUser changes
    useEffect(() => {
        // Update profile picture URL if currentUser exists and has a photoURL
        if (currentUser && currentUser.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]);

    // HTML for Profile Picture
    return (
        <div className="profilepicture"> 
            <div className="chooseFile"> 
                <input type="file" onChange={handleChange} /> {/* File input element */}
            </div>
            <div className="upload"> 
                <button disabled={loading || !photo} onClick={handleClick}>Upload</button> {/* Upload button */}
            </div>
            <div className="profilePictureSettings"> 
                <img src={photoURL} alt="Avatar" className="avatar" /> {/* Profile picture displayed */}
            </div>
        </div>
    );
}



