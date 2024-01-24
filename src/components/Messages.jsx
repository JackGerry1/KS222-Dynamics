// Messages.jsx

// import react and firebase functions, alongside contexts
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import Message from "./Message";

// function to handle Messages Component
const Messages = () => {
  // State to hold messages for the current chat
  const [messages, setMessages] = useState([]);

  // Access the chat context to get current chat information
  const { data } = useContext(ChatContext);

  // Effect to subscribe to updates in the messages collection
  useEffect(() => {
    // Function to handle changes in the messages collection
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // Check if the document exists before updating state
      doc.exists() && setMessages(doc.data().messages);
    });

    // Unsubscribe when the component is unmounted or chatId changes
    return () => {
      unsub();
    };
  }, [data.chatId]); // rerun the hook if the user switches to a different user chats

  // JSX content for displaying messages
  return (
    // render the messages div
    <div className="messages">
      {/* Map through messages and render Message component for each based on their id */}
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div> // end of messages
  );
};

// Exporting the Messages component as default
export default Messages;
