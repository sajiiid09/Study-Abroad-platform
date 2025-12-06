import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/client";

export type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setInitialized(true);
      return;
    }

    setToken(savedToken);

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      })
      .finally(() => setInitialized(true));
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(user) && Boolean(token),
    login,
    logout,
  };

  if (!initialized) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
