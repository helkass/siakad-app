import {
   Table,
   TableContainer,
   Tbody,
   Td,
   Tfoot,
   Th,
   Thead,
   Tr,
   VStack,
   Text,
   Button,
} from "@chakra-ui/react";
import templateHtmlHasilStudi from "../../../components/htmlTemplates/templateHasilStudi";
import { InputSelectStudi } from "../../../components/common/InputComponent";
import UserSection from "../../../components/layout/UserSection";
import { TableLoaderComponent } from "../../../components/common/LoaderComponent";
import { useState } from "react";
import { useFetch } from "../../../helpers";
import { useAuth } from "../../../contexts/useAuth";
import { TfiPrinter } from "react-icons/tfi";

const HasilStudi = () => {
   const [semester, setSemester] = useState("");
   const [tahun, setTahun] = useState("");
   const hasilStudi = useFetch();
   const transkrip = useFetch();
   const { user } = useAuth();

   const showHasilStudi = async () => {
      await hasilStudi.get(
         `/transkrip/studi?nim=${user.nim}&semester=${semester}&tahun=${tahun}`
      );
      await transkrip.get(`/transkrip?nim=${user.nim}`);
   };

   const printPdf = async () => {
      const htmlResult = await templateHtmlHasilStudi(
         transkrip?.data[0]?.mahasiswa,
         hasilStudi.data,
         transkrip.data[0]
      );
      const pW = window.open("", "", `height="100%", width="100%"`);
      pW.document.write(htmlResult);
      pW.document.close();
      pW.print();
   };
   return (
      <UserSection title="Hasil Studi">
         <VStack bg="white" p="2" rounded="md" gap="3" align="left" mb="6">
            <Text fontSize={14} color="gray.500">
               Berikut ini Kartu Hasil Studi tiap Semester dan Tahun Ajaran,
               Untuk nilai yang belum keluar Defaultnya E atau kosong.
            </Text>
            <InputSelectStudi
               setSemester={(s) => setSemester(s)}
               setYear={(y) => setTahun(y)}
            />
            <Button
               onClick={showHasilStudi}
               colorScheme="yellow"
               w="max-content"
               color="white">
               Tampilkan KHS
            </Button>
         </VStack>
         {hasilStudi.data !== null && hasilStudi.data.length > 0 && (
            <>
               <TableContainer bg="white">
                  <Table
                     variant="striped"
                     size={"md"}
                     colorScheme="blackAlpha"
                     p="2">
                     <Thead>
                        <Tr>
                           <Th w="2%" rowSpan={2}>
                              No.
                           </Th>
                           <Th rowSpan={2}>Kode mata kuliah</Th>
                           <Th rowSpan={2}>nama mata kuliah</Th>
                           <Th rowSpan={2}>sks</Th>
                           <Th colSpan={3} textAlign="center">
                              perkuliahan
                           </Th>
                           <Th rowSpan={2}>sks*indeks</Th>
                        </Tr>
                        <Tr>
                           <Th textAlign="center">angka</Th>
                           <Th textAlign="center">huruf</Th>
                           <Th textAlign="center">indeks</Th>
                        </Tr>
                     </Thead>
                     {hasilStudi.isLoading ? (
                        <TableLoaderComponent />
                     ) : (
                        hasilStudi.data !== null && (
                           <>
                              <Tbody>
                                 {hasilStudi.data.map((item, idx) => {
                                    const { hasil_studi_matkul, ...rest } =
                                       item;
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
                                          <Td textAlign="right">
                                             {rest.total}
                                          </Td>
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
                                          .map(
                                             (item) => item.hasil_studi_matkul
                                          )
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
                                    <Td textAlign={"right"}>
                                       {Number(
                                          hasilStudi.data
                                             .map((item) => item.total)
                                             .reduce((a, b) => a + b) /
                                             hasilStudi.data
                                                .map(
                                                   (item) =>
                                                      item.hasil_studi_matkul
                                                )
                                                .map((item) => item.sks)
                                                .reduce((a, b) => a + b)
                                       ).toFixed(2)}
                                    </Td>
                                 </Tr>
                                 {transkrip.data !== null && (
                                    <Tr fontWeight={"600"}>
                                       <Td colSpan={7} textAlign="right">
                                          IPK (Indeks Prestasi Komulatif)
                                       </Td>
                                       <Td textAlign={"right"}>
                                          {Number(
                                             transkrip?.data[0].nilai
                                          ).toFixed(2)}
                                       </Td>
                                    </Tr>
                                 )}
                              </Tfoot>
                           </>
                        )
                     )}
                  </Table>
               </TableContainer>
               <Button
                  onClick={printPdf}
                  colorScheme="yellow"
                  mx="auto"
                  my="5"
                  color="white"
                  gap="3">
                  <TfiPrinter size={22} />
                  Cetak Hasil Studi
               </Button>
            </>
         )}
      </UserSection>
   );
};

export default HasilStudi;
