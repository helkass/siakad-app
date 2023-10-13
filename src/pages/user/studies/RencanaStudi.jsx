import {
   Button,
   Table,
   TableContainer,
   Tbody,
   Td,
   Th,
   Thead,
   Tr,
   useToast,
} from "@chakra-ui/react";
import ErrorBoundary from "../../../components/error/ErrorBoundary";
import UserSection from "../../../components/layout/UserSection";
import { TableLoaderComponent } from "../../../components/common/LoaderComponent";
import { AiFillPrinter } from "react-icons/ai";
import { useFetch } from "../../../helpers";
import { useAuth } from "../../../contexts/useAuth";
import { useEffect } from "react";
import apiClient from "../../../api/apiClient";

const RencanaStudi = () => {
   const jadwalKuliah = useFetch();
   const rencanaStudi = useFetch();
   const toast = useToast({ duration: 3000, isClosable: true });
   const { user } = useAuth();

   console.log(rencanaStudi.data);

   const handleDownload = async () => {
      const link = document.createElement("a");

      if (!rencanaStudi.data?.file) {
         await apiClient
            .get(`/transkrip/rencana?nim=${user.nim}`, {
               headers: {
                  "Content-Type": "application/json",
                  api_key_siakad: JSON.parse(
                     localStorage.getItem("api_key_siakad")
                  ),
               },
            })
            .then((res) => {
               if (res.status === 200) {
                  link.href = res.data.data.file;
               }

               if (res.status === 400) {
                  toast({ status: "error", description: res.data.data.error });
               }
            })
            .catch((err) => {
               toast({ status: "error", description: err.response.data.error });
            });
      } else {
         link.href = rencanaStudi.data.file;
      }

      link.download = `KRS_${rencanaStudi.data?.nim}.pdf`;
      link.click();
   };

   useEffect(() => {
      jadwalKuliah.get(`/jadwal?kelas=${user.kelas}`);
      rencanaStudi.get(`/transkrip/rencana?nim=${user.nim}`);
   }, []);

   return (
      <UserSection title="Rencana Studi">
         <TableContainer bg="white">
            <Table variant="striped" size={"md"} colorScheme="blackAlpha" p="2">
               <Thead>
                  <Tr>
                     <Th w="2%" rowSpan={2}>
                        No.
                     </Th>
                     <Th rowSpan={2}>Kode MK</Th>
                     <Th rowSpan={2}>nama MK</Th>
                     <Th rowSpan={2}>dosen pengajar</Th>
                     <Th rowSpan={2}>sks</Th>
                     <Th rowSpan={2}>Kelas</Th>
                     <Th colSpan={3} textAlign="center">
                        perkuliahan
                     </Th>
                  </Tr>
                  <Tr>
                     <Th textAlign="center">ruang</Th>
                     <Th textAlign="center">hari</Th>
                     <Th textAlign="center">waktu</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {jadwalKuliah.isLoading ? (
                     <TableLoaderComponent colSpan={9} />
                  ) : jadwalKuliah.data !== null ? (
                     jadwalKuliah.data.map((item, idx) => {
                        const {
                           jadwal_mata_kuliah,
                           dosen_jadwal_kuliah,
                           waktu_jadwal_kuliah,
                           ...rest
                        } = item;
                        return (
                           <Tr key={item.id}>
                              <Td w="2%">{idx + 1}</Td>
                              <Td textAlign="left">
                                 {jadwal_mata_kuliah.kode}
                              </Td>
                              <Td>{rest.mata_kuliah}</Td>
                              <Td>{dosen_jadwal_kuliah.name}</Td>
                              <Td>{jadwal_mata_kuliah.sks}</Td>
                              <Td>{user.kelas}</Td>
                              <Td textAlign="center">{rest.ruangan}</Td>
                              <Td textAlign="center">{rest.hari}</Td>
                              <Td textAlign="center">
                                 {waktu_jadwal_kuliah.waktu_mulai} -
                                 {waktu_jadwal_kuliah.waktu_berakhir}
                              </Td>
                           </Tr>
                        );
                     })
                  ) : (
                     <Tr minH="120px">
                        <Td>
                           <ErrorBoundary />
                        </Td>
                     </Tr>
                  )}
               </Tbody>
            </Table>
         </TableContainer>
         <Button
            colorScheme="yellow"
            gap="4"
            color="white"
            w="max-content"
            mx="auto"
            onClick={handleDownload}
            my="5">
            <AiFillPrinter size={22} />
            Cetak KRS
         </Button>
      </UserSection>
   );
};

export default RencanaStudi;
