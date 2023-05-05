import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface IProvider {
  children: React.ReactNode;
}

export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  info: boolean;
  setInfo: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AuthContextProvider: React.FC<IProvider> = ({ children }) => {
  const [user, setUser] = React.useState<IAuthContext["user"]>(null);
  const [info, setInfo] = React.useState<IAuthContext["info"]>(false);
  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser((prev) => (prev = currentUser));
    });

    return () => unSubscribe();
  }, []);

  return (
    <Context.Provider value={{ user, setUser, info, setInfo }}>
      {children}
    </Context.Provider>
  );
};

const Context = React.createContext<IAuthContext | null>(null);

export default Context;
