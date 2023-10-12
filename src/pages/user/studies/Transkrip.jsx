import {
   Table,
   TableContainer,
   Tbody,
   Td,
   Tfoot,
   Th,
   Thead,
   Tr,
} from "@chakra-ui/react";
import UserSection from "../../../components/layout/UserSection";
import { TableLoaderComponent } from "../../../components/common/LoaderComponent";
import { useFetch } from "../../../helpers";
import { useAuth } from "../../../contexts/useAuth";
import { useEffect } from "react";

const Transkrip = () => {
   const hasilStudi = useFetch();
   const transkrip = useFetch();
   const { user } = useAuth();

   useEffect(() => {
      hasilStudi.get(`/transkrip/studi?nim=${user.nim}`);
      transkrip.get(`/transkrip?nim=${user.nim}`);
   }, []);

   return (
      <UserSection title="Transkrip Nilai">
         <TableContainer bg="white">
            <Table variant="striped" size={"md"} colorScheme="blackAlpha" p="2">
               <Thead>
                  <Tr>
                     <Th w="2%" rowSpan={2}>
                        No.
                     </Th>
                     <Th rowSpan={2}>Kode mata kuliah</Th>
                     <Th rowSpan={2}>nama mata kuliah</Th>
                     <Th
                        rowSpan={2}
                        borderRight={"1px solid"}
                        borderRightColor={"gray.200"}>
                        sks
                     </Th>
                     <Th
                        colSpan={3}
                        textAlign="center"
                        borderRight={"1px solid"}
                        borderRightColor={"gray.200"}>
                        perkuliahan
                     </Th>
                     <Th rowSpan={2}>sks*indeks</Th>
                  </Tr>
                  <Tr>
                     <Th textAlign="center">angka</Th>
                     <Th textAlign="center">huruf</Th>
                     <Th
                        textAlign="center"
                        borderRight={"1px solid"}
                        borderRightColor={"gray.200"}>
                        indeks
                     </Th>
                  </Tr>
               </Thead>
               {hasilStudi.isLoading ? (
                  <TableLoaderComponent />
               ) : (
                  hasilStudi.data !== null && (
                     <>
                        <Tbody>
                           {hasilStudi.data.map((item, idx) => {
                              const { hasil_studi_matkul, ...rest } = item;
                              return (
                                 <Tr key={rest.id}>
                                    <Td w="2%">{idx + 1}</Td>
                                    <Td textAlign="left">
                                       {hasil_studi_matkul.kode}
                                    </Td>
                                    <Td>{rest.mata_kuliah}</Td>
                                    <Td textAlign={"center"}>
                                       {hasil_studi_matkul.sks}
                                    </Td>
                                    <Td textAlign="center" isNumeric>
                                       {rest.angka}
                                    </Td>
                                    <Td
                                       textAlign="center"
                                       textTransform="uppercase">
                                       {rest.huruf}
                                    </Td>
                                    <Td textAlign="center" isNumeric>
                                       {rest.indeks}
                                    </Td>
                                    <Td textAlign="right">{rest.total}</Td>
                                 </Tr>
                              );
                           })}
                        </Tbody>
                        <Tfoot>
                           <Tr fontWeight={"600"}>
                              <Td colSpan={3} textAlign="right">
                                 Total SKS
                              </Td>
                              <Td textAlign={"center"}>
                                 {hasilStudi.data
                                    .map((item) => item.hasil_studi_matkul)
                                    .map((item) => item.sks)
                                    .reduce((a, b) => a + b)}
                              </Td>
                              <Td colSpan={3}></Td>
                              <Td textAlign={"right"}>
                                 {hasilStudi.data
                                    .map((item) => item.total)
                                    .reduce((a, b) => a + b)}
                              </Td>
                           </Tr>
                           <Tr fontWeight={"600"}>
                              <Td colSpan={7} textAlign="right">
                                 IPS (Indeks Prestasi Semester)
                              </Td>
                              <Td textAlign={"right"}>3.30</Td>
                           </Tr>
                           {transkrip.data !== null && (
                              <Tr fontWeight={"600"}>
                                 <Td colSpan={7} textAlign="right">
                                    IPK (Indeks Prestasi Komulatif)
                                 </Td>

                                 <Td textAlign={"right"}>
                                    {Number(transkrip?.data[0].nilai).toFixed(
                                       2
                                    )}
                                 </Td>
                              </Tr>
                           )}
                        </Tfoot>
                     </>
                  )
               )}
            </Table>
         </TableContainer>
      </UserSection>
   );
};

export default Transkrip;
