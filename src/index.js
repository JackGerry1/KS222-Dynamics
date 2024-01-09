// Import react libaries, stylings and App component
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css'; 
import App from './App'; 

// Create a root React DOM node using ReactDOM's createRoot method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component within React's StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
