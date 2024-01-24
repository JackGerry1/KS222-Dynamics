// AuthContext.js

// Import necessary dependencies from React
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth";

// Create a new context for the authentication information
export const AuthContext = createContext();

// Create a provider component for the Auth context
export const AuthContextProvider = ({ children }) => {
  // Use state to track the current user information
  const [currentUser, setCurrentUser] = useState({});

  // Use the useEffect hook to subscribe to authentication state changes
  useEffect(() => {
    // Use onAuthStateChanged to listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // When the authentication state changes, update the currentUser state
      setCurrentUser(user);
    });

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // The empty dependency array ensures that the effect runs only once during component mount

  // Provide the AuthContext with the current user information
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
