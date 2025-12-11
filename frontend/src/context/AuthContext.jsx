import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../lib/authApi"; // <-- USE THIS instead of api

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Runs on page refresh
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authApi.get("/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  const login = async (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);

    const res = await authApi.get("/me", {
      headers: { Authorization: `Bearer ${jwtToken}` }
    });

    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
