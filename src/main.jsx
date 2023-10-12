import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <HelmetProvider>
         <BrowserRouter>
               <ChakraProvider
                  toastOptions={{ defaultOptions: { position: "bottom" } }}>
                  <AuthProvider>
                     <App />
                  </AuthProvider>
               </ChakraProvider>
         </BrowserRouter>
      </HelmetProvider>
   </React.StrictMode>
);
