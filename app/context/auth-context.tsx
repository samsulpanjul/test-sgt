"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User, getIdToken } from "firebase/auth";
import { auth } from "../firebase/client";

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
  getToken: async () => null,
  initializing: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const setTokenCookie = async (user: User) => {
    const token = await getIdToken(user);

    // Set cookie 1 hour expired time
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; secure; samesite=lax`;
  };

  const removeTokenCookie = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await setTokenCookie(firebaseUser);
        setUser(firebaseUser);
      } else {
        removeTokenCookie();
        setUser(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
    removeTokenCookie();
    setUser(null);
  };

  const getToken = async () => {
    if (!auth.currentUser) return null;
    return await getIdToken(auth.currentUser);
  };

  return (
    <AuthContext.Provider value={{ user, logout, getToken, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
