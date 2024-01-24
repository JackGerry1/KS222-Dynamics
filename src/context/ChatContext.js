// ChatContext.js

// Import necessary dependencies from React and AuthContext
import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext"; 

// Create a new context for the Chat component
export const ChatContext = createContext();

// Create a provider component for the Chat context
export const ChatContextProvider = ({ children }) => {
  // Access the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Define the initial state of the Chat context
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  // Ensure currentUser is available before using it
  // this is used to make other users cannot see chats that they shouldn't see upon logging in
  // therefore setting it to the INITIAL_STATE. 
  if (currentUser) {
    INITIAL_STATE.chatId = "null";
    INITIAL_STATE.user = {};
  }

  // Define the reducer function for handling state updates
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        // Ensure action.payload is not null before accessing its properties
        const userPayload = action.payload || {};

        return {
          user: userPayload,
          // Determine the chatId based on user ids for sorting consistency
          chatId:
            currentUser && currentUser.uid > userPayload.uid
              ? currentUser.uid + userPayload.uid
              : userPayload.uid + (currentUser ? currentUser.uid : ""),
        };
      
      // default case just return the state
      default:
        return state;
    }
  };

  // Use the useReducer hook to manage state updates with the reducer
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // Provide the ChatContext with the current state and dispatch function
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
