import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/clientApp";

export const checkUserLoggedIn = (setIsLoggedIn) => {
  onAuthStateChanged(auth, (user) => {
    setIsLoggedIn(!!user);
  });
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return currentUser;
};

export const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};

export const logout = () => {
  signOut(auth).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};
