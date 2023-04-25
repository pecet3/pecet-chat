import React from "react";
import { User } from "firebase/auth";

interface IProvider {
  children: React.ReactNode;
}

export interface IContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const ChatContextProvider: React.FC<IProvider> = ({ children }) => {
  const [user, setUser] = React.useState(null);
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

const Context = React.createContext<IContext | null>(null);

export default Context;
