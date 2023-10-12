import { useState } from "react";
import { InputComponent, InputSelects } from "../../components/common";
import userFp from "../../assets/user.jpg";
import { getBase64 } from "../../utils/base64Converter";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
   Box,
   Button,
   Container,
   FormControl,
   FormHelperText,
   FormLabel,
   HStack,
   Heading,
   Image,
   Input,
   Stack,
   Textarea,
   VStack,
   useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import apiClient from "../../api/apiClient";

const RegistrasiPage = () => {
   const [changeMahasiswaValue, setChangeMahasiswaValue] = useState({});
   const [changeWaliValue, setChangeWaliValue] = useState({});
   const [profilePic, setProfilePic] = useState(null);
   const { id } = useParams();
   const toast = useToast();
   const navigate = useNavigate();
   const [isLoading, setLoading] = useState(false);

   const handleChangeMahasiswa = (e) => {
      setChangeMahasiswaValue(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   const handleChangeWali = (e) => {
      setChangeWaliValue(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(true);
      getBase64(profilePic, async (result) => {
         await apiClient
            .post("/mahasiswa", {
               mahasiswa: { ...changeMahasiswaValue, profilePic: result },
               waliMahasiswa: {
                  ...changeWaliValue,
                  nim: changeMahasiswaValue.nim,
               },
            })
            .then((res) => {
               if (res.status === 200) {
                  event.target.reset();
                  toast({
                     title: "Status Pendaftaran",
                     type: "success",
                     description: "Berhasil Melakukan Pendataran",
                     isClosable: true,
                     duration: 4000,
                  });
               }

               if (res.status >= 400 || res.data?.error) {
                  toast({
                     title: "Status Pendaftaran",
                     type: "error",
                     description: res.data?.error,
                     isClosable: true,
                     duration: 4000,
                  });
               }
            })
            .catch((err) => {
               toast({
                  title: "Status Pendaftaran",
                  type: "error",
                  description: err.response.data?.error,
                  isClosable: true,
                  duration: 4000,
               });
            })
            .finally(() => {
               setLoading(false);
            });
      });
   };

   useEffect(() => {
      const checkKode = async () => {
         setLoading(true);
         // get kode and kelas validation from localstorage
         const val = localStorage.getItem("validation")
            ? JSON.parse(localStorage.getItem("validation"))
            : null;

         if (val === null) {
            return <Navigate to="/registrasi" replace />;
         } else if (val.kode !== id) {
            return <Navigate to="/registrasi" replace />;
         } else {
            await apiClient
               .post("/presensi/kode/check", {
                  kode: val.kode,
                  kelas: val.kelas,
               })
               .then((res) => {
                  if (res.status >= 400) {
                     navigate("/registrasi", { replace: true });
                  }
               })
               .catch(() => {
                  navigate("/registrasi", { replace: true });
               });
         }

         setLoading(false);
      };

      checkKode();
   }, []);

   return (
      <Container as="section" maxW="7xl">
         <Helmet>
            <meta
               name="description"
               content="Registrasi data mahasiswa. aplikasi khusus bagi mahasiswa IAI Al Muhammad Cepu"
            />
            <title>Registrasi Siakad Mahasiswa | IAI Al Muhammad Cepu</title>
         </Helmet>
         <VStack my={5}>
            <Heading>Pendaftaran</Heading>
            <form onSubmit={handleSubmit}>
               <Stack spacing={8} mt={5}>
                  <HStack
                     direction={{ base: "column", md: "row" }}
                     align="start"
                     spacing="6">
                     <VStack w={{ base: "200%", md: "50%" }}>
                        {/* form input mahasiswa */}
                        <Heading fontSize={20} my={3}>
                           Data Mahasiswa
                        </Heading>
                        <HStack w="full">
                           <InputComponent
                              type="text"
                              required
                              name="nim"
                              id="nim"
                              label="NIM"
                              onChange={handleChangeMahasiswa}
                           />
                           <InputComponent
                              type="text"
                              required
                              name="name"
                              id="name"
                              label="Nama"
                              onChange={handleChangeMahasiswa}
                           />
                        </HStack>
                        <HStack w="full">
                           <InputComponent
                              type="text"
                              required
                              name="phone"
                              id="phone"
                              label="No Handphone"
                              onChange={handleChangeMahasiswa}
                           />
                           <InputComponent
                              type="text"
                              required
                              name="semester"
                              id="semester"
                              label="Semester"
                              placeholder="1"
                              onChange={handleChangeMahasiswa}
                           />
                        </HStack>
                        <HStack w="full">
                           <InputSelects
                              label="Kelas"
                              data={"kelas"}
                              id="kelas"
                              required
                              defaultValue="Pilih kelas"
                              onChange={handleChangeMahasiswa}
                           />
                           <InputSelects
                              label="Jurusan"
                              data={"jurusan"}
                              defaultValue="Pilih jurusan"
                              id="jurusan"
                              required
                              onChange={handleChangeMahasiswa}
                           />
                        </HStack>
                        <HStack w="full">
                           <InputComponent
                              type="text"
                              required
                              name="tahun"
                              id="tahun"
                              label="Tahun Angkatan"
                              onChange={handleChangeMahasiswa}
                           />
                           <InputComponent
                              type="email"
                              required
                              name="email"
                              id="email"
                              label="Email"
                              onChange={handleChangeMahasiswa}
                           />
                        </HStack>
                        <InputComponent
                           type="text"
                           required
                           name="born"
                           id="born"
                           placeholder="Blora, 17 Agustus 1999"
                           label="Tanggal Lahir"
                           onChange={handleChangeMahasiswa}
                        />
                        <HStack w="full">
                           <InputComponent
                              type="text"
                              required
                              name="provinsi"
                              id="provinsi"
                              label="Provinsi"
                              onChange={handleChangeMahasiswa}
                           />
                           <InputComponent
                              type="text"
                              required
                              name="kota"
                              id="kota"
                              label="Kota"
                              onChange={handleChangeMahasiswa}
                           />
                        </HStack>
                        <FormControl isRequired>
                           <FormLabel>Alamat</FormLabel>
                           <Textarea
                              type="text"
                              required
                              name="alamat"
                              id="alamat"
                              onChange={handleChangeWali}
                           />
                        </FormControl>
                        <HStack w="full">
                           <HStack
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                              }}>
                              <FormControl>
                                 <FormLabel htmlFor="image">
                                    Ganti Foto Profile
                                 </FormLabel>
                                 <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    border="none"
                                    px="2"
                                    py="1"
                                    accept=".jpg, .png, .jpeg"
                                    onChange={(e) =>
                                       setProfilePic(e.target.files[0])
                                    }
                                 />
                                 <FormHelperText>
                                    Max Size 2MB | ext file includes .jpg .png
                                    .jpeg
                                 </FormHelperText>
                              </FormControl>
                           </HStack>
                           <Box pos="relative" boxSize={140}>
                              <Image
                                 objectFit={"cover"}
                                 src={
                                    profilePic !== null
                                       ? URL.createObjectURL(profilePic)
                                       : userFp
                                 }
                                 alt="profile picture"
                              />
                           </Box>
                        </HStack>
                     </VStack>
                     {/* form input wali mahasiswa */}
                     <VStack w={{ base: "200%", md: "50%" }}>
                        {/* form input mahasiswa */}
                        <Heading fontSize={20} my={3}>
                           Data Wali Mahasiswa
                        </Heading>
                        <HStack w="full">
                           <InputComponent
                              type="text"
                              required
                              name="name"
                              label="Nama orang tua"
                              id="nama-wali"
                              onChange={handleChangeWali}
                           />
                           <InputComponent
                              type="text"
                              required
                              name="phone"
                              id="phone-wali"
                              label="No Handphone"
                              onChange={handleChangeWali}
                           />
                        </HStack>
                        <FormControl isRequired>
                           <FormLabel>Alamat</FormLabel>
                           <Textarea
                              type="text"
                              required
                              name="alamat"
                              id="alamat-wali"
                              onChange={handleChangeWali}
                           />
                        </FormControl>
                        <HStack w="full">
                           <InputComponent
                              type="text"
                              required
                              name="provinsi"
                              id="provinsi-wali"
                              label="Provinsi"
                              onChange={handleChangeWali}
                           />
                           <InputComponent
                              type="text"
                              required
                              name="kota"
                              id="kota-wali"
                              label="Kota"
                              onChange={handleChangeWali}
                           />
                        </HStack>
                     </VStack>
                  </HStack>
                  <Button
                     isLoading={isLoading}
                     loadingText="Loading..."
                     type="submit"
                     bg="var(--primary)"
                     color="white"
                     minW="140px"
                     alignSelf="flex-end">
                     Daftar
                  </Button>
               </Stack>
            </form>
         </VStack>
      </Container>
   );
};

export default RegistrasiPage;
