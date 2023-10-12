import { Navigate } from "react-router-dom";
import { useAuth, isUnauthenticated } from "../contexts/useAuth";

const ProtectRoute = ({ children }) => {
   const isAuth = useAuth();
   const isAuthNotNull = isUnauthenticated();

   if (!isAuth.user && isAuthNotNull === null) {
      // user is not authenticated
      return <Navigate to="/login" replace />;
   } else {
      return children;
   }
};

export default ProtectRoute;
