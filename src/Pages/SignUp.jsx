import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import logoImage from "../Assets/Logo1.png";
import defaultProfileImage from "../Assets/profileDefault.png"; // Import default profile picture
import { changePageTitle } from "../components/Title";
import { v4 as uuid } from "uuid";
import ReCAPTCHA from "react-google-recaptcha";

function SignUp() {
  const [, setErr] = useState(false);
  const [, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [file, setFile] = useState(null); // State for file upload
  const [reCAPTCHAToken, setReCAPTCHAToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {

      // Check if ReCAPTCHA token is available
      if (!reCAPTCHAToken) {
        // Error message dispayed if token not availble
        setErrorMessage("Please complete the ReCAPTCHA.");
        return; // Prevent sign-in if ReCAPTCHA token is not available
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);

      let downloadURL = defaultProfileImage; // Default profile picture URL

      // If a file is selected, upload the custom profile picture
      if (file) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `${uuid() + date}`);
        await uploadBytesResumable(storageRef, file);
        downloadURL = await getDownloadURL(storageRef);
      }

      await updateProfile(res.user, {
        displayName: username,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        username,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/signin");
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }

  };

    // Function to handle ReCAPTCHA completion
    // This function sets a token when recaptcha is completed
    const handleReCAPTCHAChange = (token) => {
    // The token has to be set to allow the user to login
      setReCAPTCHAToken(token);

  };

  const isSignUpDisabled = !isChecked || !email || !password || !username;
  changePageTitle("KS222-SignUp");

  return (
    <div className="center">
      <Link to="/">
        <img src={logoImage} alt="Logo" className="sign-logo" />
      </Link>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt-field">
          <input
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div className="txt-field">
          <input
            required
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="txt-field">
          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className="txt-field">
          <input
            type="file"
            id="profile-pic"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p>
            If no picture is uploaded, a default profile picture will be used.
          </p>
        </div>
        <div className="signup-link">
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            I have read and agree to KS222 Dynamic Chat App's{" "}
            <Link to="/TOS">Terms of Service</Link>
          </label>
        </div>
        <button disabled={isSignUpDisabled}>Sign up</button>
                {/* ReCAPTCHA entry box */}
                <div className="buttoncontainer">
          <ReCAPTCHA
            sitekey="6Le1HzYfAAAAAP9SdeuzJ7GDta-hWegd8lpABac1"
            onChange={handleReCAPTCHAChange}
          />
        </div>
        {/* Error message displayed if ReCAPTCHA not completed or incorrect credentials entered*/}
        <div className="errorMessage">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div className="signup-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
