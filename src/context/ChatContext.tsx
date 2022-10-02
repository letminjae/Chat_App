import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch
} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext<any>({});

export const ChatContextProvider = ({ children } : {children : React.ReactNode}) => {
  const currentUser = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state : any, action : any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const value = { state, dispatch }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};