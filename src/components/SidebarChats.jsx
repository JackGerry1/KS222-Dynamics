// SidebarChats.jsx

// import react and firebase functions, alongside contexts
import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

// Functional component for the SidebarChats
const SidebarChats = () => {
  // State to store sidebar chats data, AuthContext and ChatContext
  const [sidebarChats, setSidebarChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    // Function to get and update sidebar chats data when the component mounts
    const getSidebarChats = () => {
      // Subscribe to changes in the userChats document using onSnapshot
      const unsubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          // Update the sidebarChats state with the data from the document
          setSidebarChats(doc.data());
        }
      );

      // Return a cleanup function to unsubscribe when the component unmounts
      return () => {
        unsubscribe();
      };
    };

    // Check if currentUser.uid is available before calling getSidebarChats
    currentUser.uid && getSidebarChats();
  }, [currentUser.uid]);

  // Function to handle selecting a user chat
  const handleSelect = (userInfo) => {
    // Dispatch a change user action with the selected user information
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    // return div of SidebarChats containing messages
    <div className="chats">
      {/* Map through sidebarChats and display user chats sorted based on the most recently sent message */}
      {Object.entries(sidebarChats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((sidebarChat) => (
          // userChat is displayed on the sidebar [0] represents the chatId [1] is where the content of the chat is
          // so in this case the message
          <div
            className="userChat"
            key={sidebarChat[0]}
            onClick={() => handleSelect(sidebarChat[1].userInfo)}
          >
            {/* tempory image to represent users profile picture if implemnted */}
            <img src={sidebarChat[1].userInfo.photoURL} alt="" />
            {/* retrieve the username and last message that has been sent by the users that you have had communication with */}
            <div className="userChatInfo">
              <span>{sidebarChat[1].userInfo?.username}</span>
              <p>{sidebarChat[1].lastMessage?.text}</p>
            </div>{" "}
            {/* end of userChatInfo*/}
          </div> // end of userChat
        ))}
    </div> // end of chats
  );
};

// Exporting the SidebarChats component as default
export default SidebarChats;
