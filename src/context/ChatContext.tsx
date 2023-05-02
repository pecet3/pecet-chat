import React from "react";

interface IProvider {
  children: React.ReactNode;
}

export interface IChatContext {}
export const ChatContextProvider: React.FC<IProvider> = ({ children }) => {
const {user} = React.useContext(AuthContext) as IAuthContext
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
            chatId: user.uid > findedUser.uid
            ? user.uid + findedUser.uid
            : findedUser.uid + user.uid;,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

const Context = React.createContext<IAuthContext | null>(null);

export default Context;
