import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export interface IUser {
  [key: string]: any;
  displayName?: string;
  photoURL?: string;
};

export const AuthContext = createContext<IUser>({});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user : any) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
        {children}
    </AuthContext.Provider>
  )
}