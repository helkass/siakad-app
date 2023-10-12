import { useState } from "react";
import { Button, Container, Stack, useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useLocalStorage } from "../../contexts/useLocalStorage";
import { InputComponent } from "../../components/common";

const LoginPage = () => {
   const [changeValue, setChangeValue] = useState({});
   const toast = useToast();
   const navigated = useNavigate();
   const { login } = useAuth();
   // eslint-disable-next-line no-unused-vars
   const [mhs, setUser] = useLocalStorage("mahasiswa", null);
   const [loginLoading, setLoginLoading] = useState(false);

   const showAlert = (description) => {
      toast({
         duration: 4000,
         isClosable: true,
         title: "Authentication Status",
         status: "error",
         description,
      });
   };

   async function handleSubmit(e) {
      e.preventDefault();
      setLoginLoading(true);
      await login(changeValue)
         .then((res) => {
            if (res.status === 200) {
               localStorage.setItem(
                  "api_key_siakad",
                  JSON.stringify(res.data.data.token)
               );
               setUser(res.data.data);
               navigated(`/mhs/${res.data.data.nim}`, {
                  replace: true,
                  state: "login",
               });
            }

            if (res.data?.error || res.status >= 400) {
               showAlert(res.data.error);
            }
         })
         .catch((err) => {
            showAlert(err.response.data.error);
         })
         .finally(() => {
            setLoginLoading(false);
         });
   }

   const handleChange = (e) => {
      setChangeValue(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   return (
      <Container as="section" id="validation" maxW="7xl" h="100vh">
         <Helmet>
            <meta
               name="description"
               content="login menggunakan NPM atau NIM yang sudah terdaftar. aplikasi khusus bagi mahasiswa IAI Al Muhammad Cepu"
            />
            <title>Login Siakad Mahasiswa | IAI Al Muhammad Cepu</title>
         </Helmet>
         <Stack
            as="div"
            display="flex"
            justify="center"
            align="center"
            h="100vh">
            <form onSubmit={handleSubmit} style={{ minWidth: "320px" }}>
               <InputComponent
                  type="text"
                  name="nim"
                  label="NIM"
                  onChange={handleChange}
                  required
               />
               <InputComponent
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  required
               />
               <Button
                  type="submit"
                  isLoading={loginLoading}
                  isDisabled={loginLoading}
                  loadingText="checking..."
                  sx={{ backgroundColor: "var(--primary)", color: "white" }}
                  w="100%"
                  mt="20px">
                  Masuk
               </Button>
            </form>
         </Stack>
      </Container>
   );
};

export default LoginPage;
