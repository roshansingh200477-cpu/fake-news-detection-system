import { createContext, useState, useEffect } from "react";
import { loginUser, createUser, getUser } from "../services/Api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const loadUser = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false);
    return;
  }

  try {

    const res = await getUser();
    setUser(res.data);

  } catch (error) {

    console.log("AUTH ERROR:", error.response?.data);

    localStorage.removeItem("token");
    setUser(null);

  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (data) => {

    const res = await loginUser(data);

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);   // instant UI update
  };

  const signup = async (data) => {

    const res = await createUser(data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};