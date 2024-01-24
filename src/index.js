// Importing necessary dependencies from React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Importing the main App component
import App from "./App";

// Importing context providers for authentication and chat
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

// Creating a root for rendering the React application in the specified HTML element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the main App component wrapped in context providers and StrictMode
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
