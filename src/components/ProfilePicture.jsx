import "../styles/Settings.css";
import profileImage from '../Assets/profileDefault.png';
import { useEffect, useState } from "react"; 
import { auth, upload } from "../firebase";

export default function Profile(){
    const currentUser = auth.currentUser;
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [photoURL, setPhotoURL] = useState(profileImage); 

    function handleChange(e){
        if (e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }

    function handleClick(){
        upload(photo, currentUser, setLoading);
    }

    useEffect(() => {
        if (currentUser && currentUser.photoURL){
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser])

    return (
        <div className="profilepicture">
            <input type="file" onChange={handleChange} />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <div>
                <img src={photoURL} alt="Avatar" className="avatar"/>
            </div>
        </div>
    );
}


