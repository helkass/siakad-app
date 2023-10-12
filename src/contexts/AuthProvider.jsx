import { createContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useMahasiswa } from "../helpers";
import { useToast } from "@chakra-ui/react";
import apiClient from "../api/apiClient";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useLocalStorage("mahasiswa", null);
   const navigate = useNavigate();
   const mahasiswa = useMahasiswa();
   const toast = useToast();

   if (mahasiswa.isError) {
      toast({
         title: "Authentication",
         description: mahasiswa.message,
         status: "error",
         duration: 4000,
         isClosable: true,
      });
   }
   // login mahasiswa
   const login = useCallback(async (body) => {
      return apiClient.post("/mahasiswa/login", body, {
         headers: {
            "Content-Type": "application/json",
         },
      });
   }, []);

   // call this function to sign out logged in user
   const logout = useCallback(() => {
      localStorage.removeItem("api_key_siakad");
      localStorage.removeItem("mahasiswa");
      navigate("/", { replace: true });
   }, []);

   const value = useMemo(
      () => ({
         user,
         login,
         logout,
      }),
      [user]
   );
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
