import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /* Safe JSON Parse Helper */
  const safeParse = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  };

  const tokenFromStorage = localStorage.getItem("token");
  const userFromStorage = safeParse("user");

  const [token, setToken] = useState(tokenFromStorage);
  
  // If we have token but no user (due to old session), force logout context locally
  // But we can also just set user to null and hope user re-logins.
  // Better: if token exists but user is null, valid token might be corrupted?
  // Let's keep it simple: just load what we have.
  const [user, setUser] = useState(userFromStorage);
  
  // Initialize role safely
  const [role, setRole] = useState(() => {
    if (tokenFromStorage) {
      try {
        return jwtDecode(tokenFromStorage).role;
      } catch {
        // If token is invalid, we should probably clear it, but we can't do side effect here easily.
        // We'll just return null. The token validation logic should ideally happen in an effect.
        return null; 
      }
    }
    return null;
  });

  // Effect to validate token on mount/change if needed, or just trust the decode.
  // We'll rely on login/logout to keep state in sync.

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setRole(jwtDecode(newToken).role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
