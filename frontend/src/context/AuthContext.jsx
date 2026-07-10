import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await authService.me();
      setUser(res.data.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (data) => {
    const res = await authService.login(data);
    localStorage.setItem(
  "token",
  res.data.data.token
);
    setUser(res.data.data.user);
    return res;
  };
// const login = async (data) => {
//   const res = await authService.login(data);

//   console.log("LOGIN RESPONSE:", res.data);

//   localStorage.setItem("token", res.data.data.token);

//   console.log(
//     "TOKEN SAVED:",
//     localStorage.getItem("token")
//   );

//   setUser(res.data.data.user);

//   return res;
// };
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);