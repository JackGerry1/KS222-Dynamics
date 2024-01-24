// Import necessary dependencies from React, components, chatcontext
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

// Functional component for the main chat interface
const Chat = () => {
  // Access chat data from the ChatContext
  const { data } = useContext(ChatContext);

  // Render the main chat component
  return (
    // div for the chat component
    <div className="chat">
      {/* Display information about the current chat else dont display anything */}
      <div className="chatInfo">
        {data.user.username && (
          <span>You are now chatting with {data.user.username}</span>
        )}
      </div>{" "}
      {/* end of chatInfo */}
      {/* Conditionally render Messages component if user data is available, otherwise show a message */}
      {Object.keys(data.user || {}).length > 0 ? (
        <Messages />
      ) : (
        // if the user does not have a message render a header saying to join a chat
        <div className="messages">
          <h1 className="not-chatting">Select a user to start chatting with</h1>
        </div> // end of messages
      )}
      {/* Render the Input component for sending messages */}
      <Input />
    </div> // end of chat
  );
};

// Exporting the Chat component as default
export default Chat;
