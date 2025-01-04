import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          credentials: "include",
        });

        const data = await res.json();
        setAuthUser(data.user);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
