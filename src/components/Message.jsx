// Message.jsx

// import react and contexts
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

// Function to format the timestamp into the UK format
const formatDate = (timestamp) => {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp?.toDate());

  // Options for formatting the date and time
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Use the toLocaleString method to format the date and time according to the specified options
  return date.toLocaleString("en-UK", options);
};

// Message component represents an individual chat message
const Message = ({ message }) => {
  // Accessing the current user and chat context
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Creating a reference to the message element
  const ref = useRef();

  // Effect to scroll the message into view when it is rendered or updated
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      // Applying CSS class "owner" to messages sent by the current user else apply the message styling
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* display the message info */}
      <div className="messageInfo">
        {/* Placeholder image for the sender */}
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <div className="infoContent">
          {/* Displaying the sender's name */}
          <span>
            {message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.username}
          </span>
          {/* Displaying the formatted timestamp */}
          <span className="senderName"> {formatDate(message.date)}</span>
        </div>{" "}
        {/* end of infoContent */}
      </div>{" "}
      {/* end of messageInfo */}
      <div className="messageContent">
        {/* Displaying the message text */}
        <p>{message.text}</p>
      </div>{" "}
      {/* end of messageContent */}
    </div> // end of div
  );
};

// Exporting the Message component as default
export default Message;
