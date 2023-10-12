import { useState } from "react";
import {
   InputComponent,
   InputSelects,
} from "../../components/common/InputComponent";
import { Button, Container, Stack, useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

const ValidationRegister = () => {
   const [changeValue, setChangeValue] = useState({ kode: "", kelas: "" });
   const toast = useToast();
   const [isLoading, setLoading] = useState(false);

   const navigate = useNavigate();

   async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);

      await apiClient
         .post("/presensi/kode/check", changeValue)
         .then((res) => {
            if (res.status === 200) {
               navigate(`/registrasi/${res.data.data.kode}`);
               localStorage.setItem("validation", JSON.stringify(changeValue));
            }
            if (res.status >= 400 || res.data?.error) {
               toast({
                  status: "error",
                  description: res.data.error,
                  duration: 3000,
                  isClosable: true,
               });
            }
         })
         .catch((err) => {
            toast({
               status: "error",
               description: err.response.data?.data.error,
               duration: 3000,
               isClosable: true,
            });
         })
         .finally(() => {
            setLoading(false);
         });
   }

   const handleChange = (e) => {
      setChangeValue(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   return (
      <Container
         display="flex"
         justifyContent="center"
         alignItems="center"
         id="validation"
         minH="80vh">
         <Helmet>
            <meta
               name="description"
               content="validasi kode untuk bisa mengakses pendafataran aplikasi siakad IAI Al Muhammad Cepu"
            />
            <title>
               Validasi kode pendafataran aplikasi IAI Al Muhammad Cepu
            </title>
         </Helmet>
         <Stack
            bg="blackAlpha.50"
            rounded="md"
            boxShadow="md"
            p={7}
            w={{ base: "90%", sm: "370px", md: "420px" }}>
            <form onSubmit={handleSubmit}>
               <Stack spacing={3}>
                  <InputComponent
                     type="text"
                     required
                     name="kode"
                     id="kode"
                     bg="white"
                     label="Kode Validation"
                     onChange={handleChange}
                  />
                  <InputSelects
                     label="Kelas"
                     data="kelas"
                     bg="white"
                     name="kelas"
                     defaultValue="pilih kelas"
                     required
                     onChange={handleChange}
                  />
                  <Button
                     mt={5}
                     w="max"
                     alignSelf="center"
                     type="submit"
                     isLoading={isLoading}
                     disabled={isLoading}
                     loadingText="checking..."
                     sx={{ backgroundColor: "var(--primary)", color: "white" }}>
                     Konfirmasi
                  </Button>
               </Stack>
            </form>
         </Stack>
      </Container>
   );
};

export default ValidationRegister;
