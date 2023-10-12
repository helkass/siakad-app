import UserSection from "../../../../components/layout/UserSection";
import {
   InputSelects,
   InputComponent,
} from "../../../../components/common/InputComponent";
import {
   Box,
   Breadcrumb,
   BreadcrumbItem,
   Button,
   HStack,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Skeleton,
   Text,
   VStack,
   Stack,
   useDisclosure,
   FormControl,
   FormLabel,
   Input,
   FormHelperText,
   useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { useFetch } from "../../../../helpers";
import { useAuth } from "../../../../contexts/useAuth";
import { getBase64 } from "../../../../utils/base64Converter";

export default function TagihanPage() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const tagihan = useFetch();
   const buktiPembayaran = useFetch();
   const { user } = useAuth();
   const [form, setForm] = useState({});
   const [file, setFile] = useState(null);
   const toast = useToast({ duration: 4000, isClosable: true });

   const handleOpenModal = (idPembayaran) => {
      onOpen();
      setForm((prev) => (prev = { ...prev, pembayaran: idPembayaran }));
   };

   const handleChange = (e) => {
      setForm((prev) => (prev = { ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      getBase64(file, async (result) => {
         const data = {};
         data.nim = user.nim;
         data.file = result;
         data.bank_id = form.bank;
         data.pembayaran = form.pembayaran;

         if (form.catatan) {
            data.catatan = form.catatan;
         }

         await buktiPembayaran
            .post(`/bukti`, data)
            .then((res) => {
               if (res.status === 200) {
                  toast({
                     status: "success",
                     description: "berhasil melakukan konfirmasi",
                  });

                  setTimeout(() => {
                     // close the modal
                     onClose();
                  }, 3000);
               }

               if (res.status >= 400 || res.data.data?.error) {
                  toast({
                     status: "error",
                     description: res.data.data.error,
                  });
               }
            })
            .catch((err) => {
               toast({
                  status: "error",
                  description: err.response.data.error,
               });
            })
            .finally(() => {
               buktiPembayaran.setLoading(false);
            });
      });
   };

   useEffect(() => {
      tagihan.get(`/tagihan?nim=${user.nim}&status=belum`);
   }, []);

   return (
      <UserSection title="Daftar Tagihan">
         {/* modal konfirmasi tagihan */}
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Konfirmasi Sekarang</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <form onSubmit={handleSubmit}>
                     <VStack spacing={5}>
                        <InputSelects
                           name="bank"
                           defaultValue="Pilih penerima"
                           id="bank"
                           data={"bank"}
                           onChange={handleChange}
                        />
                        <FormControl isRequired>
                           <FormLabel htmlFor="file">
                              Foto bukti pembayaran
                           </FormLabel>
                           <Input
                              type="file"
                              name="file"
                              id="file"
                              border="none"
                              px="2"
                              py="1"
                              accept=".jpg, .png, .jpeg"
                              onChange={(e) => setFile(e.target.files[0])}
                           />
                           <FormHelperText>
                              Max Size 2MB | ext file includes .jpg .png .jpeg
                           </FormHelperText>
                        </FormControl>
                        <InputComponent
                           name="catatan"
                           type="text"
                           id="catatan"
                           label="Catatan"
                           onChange={handleChange}
                        />
                        <Button
                           type="submit"
                           colorScheme="blue"
                           my={4}
                           mr={3}
                           loadingText="checking..."
                           isLoading={buktiPembayaran.isLoading}>
                           Konfirmasi
                        </Button>
                     </VStack>
                  </form>
               </ModalBody>
            </ModalContent>
         </Modal>
         {/* end modal tagihan */}
         <VStack
            bg="white"
            display="flex"
            align="start"
            p="2"
            py="10"
            direction={"column"}
            gap="5">
            {/* lists of tagihan */}
            {tagihan.isLoading ? (
               <Stack w="full">
                  <Skeleton h="9" />
                  <Skeleton h="9" />
               </Stack>
            ) : tagihan.data !== null && tagihan.data.length > 0 ? (
               tagihan.data.map((item) => {
                  const { pembayaran_tagihan, ...rest } = item;
                  return (
                     <HStack
                        key={rest.id}
                        onClick={() => handleOpenModal(rest.pembayaran)}
                        cursor={"pointer"}
                        minH="35"
                        w="full"
                        rounded="sm"
                        boxShadow={"sm"}
                        align="center"
                        textTransform={"capitalize"}
                        justify={"space-between"}
                        bg="blackAlpha.100"
                        p="2">
                        <Text>{rest.status}</Text>
                        <Breadcrumb separator={"-"}>
                           <BreadcrumbItem>
                              <Text>{pembayaran_tagihan.semester}</Text>
                           </BreadcrumbItem>
                           <BreadcrumbItem>
                              <Breadcrumb separator={"/"}>
                                 <BreadcrumbItem>
                                    <Text>
                                       {
                                          pembayaran_tagihan.tahun_akademik
                                             .tahun_mulai
                                       }
                                    </Text>
                                 </BreadcrumbItem>
                                 <BreadcrumbItem>
                                    <Text>
                                       {
                                          pembayaran_tagihan.tahun_akademik
                                             .tahun_akhir
                                       }
                                    </Text>
                                 </BreadcrumbItem>
                              </Breadcrumb>
                           </BreadcrumbItem>
                        </Breadcrumb>
                        <Text as="span" color="blackAlpha.600">
                           <BsArrowUpRightSquare size={22} />
                        </Text>
                     </HStack>
                  );
               })
            ) : (
               <Box mx="auto" my="20">
                  <Text>Anda tidak memiliki tagihan pembayaran</Text>
               </Box>
            )}
         </VStack>
      </UserSection>
   );
}
