import { useEffect, useState } from "react";
import NullBoundary from "../../../components/error/NullBoundary";
import {
   InputComponent,
   ListValRead,
} from "../../../components/common/InputComponent";
import UserSection from "../../../components/layout/UserSection";
import {
   Image,
   Box,
   Heading,
   Card,
   CardBody,
   CardHeader,
   HStack,
   Stack,
   Skeleton,
   Button,
   useToast,
} from "@chakra-ui/react";
import user_image from "../../../assets/user.jpg";
import { useFetch, useMahasiswa } from "../../../helpers";
import { useAuth } from "../../../contexts/useAuth";
import { BiSolidEditAlt } from "react-icons/bi";

export default function ProfilePage() {
   const { get, data, isLoading } = useFetch();
   const { user } = useAuth();
   const [formUpdate, setFormUpdate] = useState({});
   const toast = useToast();
   const { update } = useMahasiswa();

   const showToast = (type, message) => {
      toast({
         title: "Update Status",
         description: message,
         status: type,
         duration: 4000,
         isClosable: true,
      });
   };

   const handleChange = (e) => {
      setFormUpdate(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   const handleUpdateBiodata = (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-unused-vars
      const { password, new_password, ...rest } = formUpdate;
      update(`/mahasiswa/${user.id}`, rest, `/mahasiswa/${user.id}`)
         .then((response) => {
            if (response.status !== 200) {
               showToast("error", response.data.error);
            } else {
               showToast("success", "Data berhasil berhasil di update");
            }
         })
         .catch((err) => {
            showToast("error", err.response.data.error);
         });
   };

   const handleUpdatePassword = (e) => {
      e.preventDefault();
      update(`/mahasiswa/${user.id}`, {
         password: formUpdate.password,
         new_password: formUpdate.new_password,
      })
         .then((response) => {
            if (response.status !== 200) {
               showToast("error", response.data.error);
            } else {
               showToast("success", "Data berhasil berhasil di update");
            }
         })
         .catch((err) => {
            showToast("error", err.response.data.error);
         });
   };

   useEffect(() => {
      get(`/mahasiswa/${user.id}`);
   }, []);

   return (
      <UserSection title="Profile Mahasiswa">
         <Box>
            <Image
               src={data !== null ? data.profilePic : user_image}
               alt="fp-mahasiswa"
               w="220px"
            />
         </Box>
         <HStack flexDir={{ base: "column", md: "row" }} align="start">
            {/* bio data mahasiswa */}
            <Box w="full">
               <Card p="2" my="3">
                  <CardHeader bg="var(--primary-medium)" color="white">
                     <Heading fontSize="18px">Biodata Mahasiswa</Heading>
                  </CardHeader>
                  <CardBody>
                     {isLoading ? (
                        <Loader />
                     ) : (
                        data !== null && (
                           <>
                              <form onSubmit={handleUpdateBiodata}>
                                 <Stack>
                                    <ListValRead
                                       id="name_mhs"
                                       label="Nama"
                                       value={data.name}
                                    />
                                    <ListValRead
                                       id="nim"
                                       label="NIM"
                                       value={data.nim}
                                    />
                                    <ListValRead
                                       id="semester"
                                       label="semester"
                                       value="5"
                                    />
                                    <ListValRead
                                       id="jurusan"
                                       label="Jurusan"
                                       value={data.jurusan}
                                    />
                                    <ListValRead
                                       id="angkatan"
                                       label="Tahun angkatan"
                                       value={data.tahun}
                                    />
                                    <InputComponent
                                       name="email"
                                       id="email"
                                       label="Email"
                                       defaultValue={data.email}
                                       borderColor="yellow.400"
                                       focusBorderColor="yellow.600"
                                       onChange={handleChange}
                                    />
                                    <InputComponent
                                       name="phone"
                                       id="phone_mhs"
                                       label="Phone"
                                       defaultValue={data.phone}
                                       borderColor="yellow.400"
                                       focusBorderColor="yellow.600"
                                       onChange={handleChange}
                                    />
                                    <InputComponent
                                       name="alamat"
                                       id="alamat_mhs"
                                       label="Alamat"
                                       defaultValue={data.alamat}
                                       borderColor="yellow.400"
                                       focusBorderColor="yellow.600"
                                       onChange={handleChange}
                                    />
                                    <InputComponent
                                       name="kota"
                                       id="kota_mhs"
                                       label="Kota"
                                       defaultValue={data.kota}
                                       borderColor="yellow.400"
                                       focusBorderColor="yellow.600"
                                       onChange={handleChange}
                                    />
                                    <InputComponent
                                       name="provinsi"
                                       id="provinsi_mhs"
                                       label="Provinsi"
                                       defaultValue={data.provinsi}
                                       borderColor="yellow.400"
                                       focusBorderColor="yellow.600"
                                       onChange={handleChange}
                                    />
                                    <Button
                                       gap={3}
                                       colorScheme="yellow"
                                       type="submit"
                                       w="max-content"
                                       alignSelf="end"
                                       color="white">
                                       <BiSolidEditAlt size={20} />
                                       Edit Biodata
                                    </Button>
                                 </Stack>
                                 {/* form update khusus password */}
                              </form>
                              <Stack
                                 spacing={5}
                                 mt={7}
                                 pt={4}
                                 borderTop="1px solid"
                                 borderTopColor="blackAlpha.100">
                                 <Heading fontSize="16">
                                    Update Password
                                 </Heading>
                                 <form onSubmit={handleUpdatePassword}>
                                    <Stack spacing={5}>
                                       <InputComponent
                                          label="Old password"
                                          name="password"
                                          id="password"
                                          required
                                          onChange={handleChange}
                                       />
                                       <InputComponent
                                          label="New password"
                                          name="new_password"
                                          id="new_password"
                                          required
                                          onChange={handleChange}
                                       />
                                       <Button
                                          gap={3}
                                          colorScheme="yellow"
                                          type="submit"
                                          w="max-content"
                                          alignSelf="end"
                                          color="white">
                                          <BiSolidEditAlt size={20} />
                                          Edit Password
                                       </Button>
                                    </Stack>
                                 </form>
                              </Stack>
                           </>
                        )
                     )}
                  </CardBody>
               </Card>
            </Box>
            {/* bio data wali mahasiswa */}
            <Box w="full">
               <Card p="2" my="3">
                  <CardHeader bg="var(--primary-medium)" color="white">
                     <Heading fontSize="18px">Biodata Orang Tua</Heading>
                  </CardHeader>
                  <CardBody>
                     {isLoading ? (
                        <Loader />
                     ) : data !== null && data.walimahasiswa !== null ? (
                        <>
                           <ListValRead
                              label="Nama"
                              id="name_wali"
                              value={data.walimahasiswa.name}
                           />
                           <ListValRead
                              id="phone_wali"
                              label="Phone"
                              value={data.walimahasiswa.phone}
                           />
                           <ListValRead
                              id="alamat_wali"
                              label="Alamat"
                              value={data.walimahasiswa.alamat}
                           />
                           <ListValRead
                              id="kota_wali"
                              label="Kota"
                              value={data.walimahasiswa.kota}
                           />
                           <ListValRead
                              id="provinsi_wali"
                              label="Provinsi"
                              value={data.walimahasiswa.provinsi}
                           />
                        </>
                     ) : (
                        <NullBoundary />
                     )}
                  </CardBody>
               </Card>
            </Box>
         </HStack>
      </UserSection>
   );
}

const Loader = () => {
   return (
      <Stack spacing={4}>
         <Skeleton h="10" />
         <Skeleton h="10" />
         <Skeleton h="10" />
         <Skeleton h="10" />
         <Skeleton h="10" />
         <Skeleton h="10" />
         <Skeleton h="10" />
      </Stack>
   );
};
