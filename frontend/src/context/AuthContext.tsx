import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const emailName = payload.email ? payload.email.split("@")[0] : "User";
        const formattedName = emailName
          .split(".")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        setUser({
          name: formattedName,
          email: payload.email,
          avatar: payload.avatar || "",
        });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    const emailName = payload.email ? payload.email.split("@")[0] : "User";
    const formattedName = emailName
      .split(".")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setUser({
      name: formattedName,
      email: payload.email,
      avatar: payload.avatar || "",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
