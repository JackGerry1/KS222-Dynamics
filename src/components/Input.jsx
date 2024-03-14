// Input.jsx

// import react and firebase functions, alongside icons and uuid
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import send_message from "../Assets/send-message.png";

// Input component rendering function
const Input = () => {
  // State to manage the input text
  const [text, setText] = useState("");

  // Access the current user and chat data from contexts
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Function to handle sending a message
  const handleSend = async () => {
    try {
      // Check if the input text is not empty
      if (text.trim() !== "" && data.chatId) {
        // Check if data.chatId exists

        // Update the messages array in the "chats" collection
        await updateDoc(doc(db, "chats", data.chatId), {
          // Update the messages array in the chats component for the current chatId with the following data
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        /*The following will update the userChats database like so
      UjHXGwDoM7r4nvYyNpU5zqIi8b1E1xpoLWvbnKgfcAZJmYlF6Yf28FKs (combined id of currentUser.uid and chosen user.uid)

        date: 23 January 2024 at 20:03:53 UTC (timestamp)
        lastMessage: text "" (string)
      
      */

        // Update the last message and date in the "userChats" collection for the current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        // Update the last message and date in the "userChats" collection for the other user
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        // Clear the input text after sending the message
        setText("");
      }
    } catch (error) {
      // TODO: say to user join a chat before sending a message
      console.error("Error updating document:", error);
      // Handle the error as needed, e.g., show a user-friendly error message
    }
  };

  // Function to handle Enter key press for sending messages
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // JSX content for the Input component
  return (
    // div for input
    <div className="input">
      {/* Input field for typing messages */}
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        value={text}
      />
      {/* Send button with associated image */}
      <div className="send">
        <img src={send_message} onClick={handleSend} alt="Send" />{" "}
        {/* Call 'handleSend' function on image click */}
      </div>{" "}
      {/* end of send */}
    </div> // end of input
  );
};

// Exporting the Input component as default
export default Input;
