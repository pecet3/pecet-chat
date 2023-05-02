import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface IProvider {
  children: React.ReactNode;
}

export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const AuthContextProvider: React.FC<IProvider> = ({ children }) => {
  const [user, setUser] = React.useState<IAuthContext["user"]>(null);

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unSubscribe();
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

const Context = React.createContext<IAuthContext | null>(null);

export default Context;
