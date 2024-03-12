// App.js

// import the relevent react dependices alongside all of the page components
import React, { useContext } from "react";
import useLocalStorage from "use-local-storage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./styles/index.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Chatpage from "./Pages/Chatpage";
import TOS from "./Pages/TOS";
import Settings from "./components/Settings";
import Toggle from "./components/Toggle";

function App() {
  // create a unautorised user to start with
  const { currentUser } = useContext(AuthContext);

  // if the user has not logged redirect them back to signin page
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" />;
    }

    return children;
  };

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <BrowserRouter>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Routes>
          {/* Default route leads to Home */}
          <Route path="/" element={<Home />} />

          {/* Route for Sign In page */}
          <Route path="/signin" element={<SignIn />} />

          {/* Route for Sign Up page */}
          <Route path="/signup" element={<SignUp />} />

          {/* Route for TOS page */}
          <Route path="/TOS" element={<TOS />} />

          {/* Route for chat page with conditional rendering based on authentication */}
          <Route
            path="/chatpage"
            element={
              <ProtectedRoute>
                <Chatpage />
              </ProtectedRoute>
            }
          />

          {/* Route for Settings page with conditional rendering based on authentication */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Exporting the App component as default
export default App;
