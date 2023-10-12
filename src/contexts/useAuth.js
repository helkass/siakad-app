import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
   return useContext(AuthContext);
};

export const isUnauthenticated = () => {
   return localStorage.getItem("mahasiswa")
      ? JSON.parse(localStorage.getItem("mahasiswa"))
      : null;
};
