import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem("token");

  const [token, setToken] = useState(tokenFromStorage);
  const [role, setRole] = useState(
    tokenFromStorage ? jwtDecode(tokenFromStorage).role : null
  );

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setRole(jwtDecode(newToken).role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
