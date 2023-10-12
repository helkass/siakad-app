import { TableLoaderComponent } from "../../../components/common/LoaderComponent";
import UserSection from "../../../components/layout/UserSection";
import Wave from "react-wavify";
import { TfiPrinter } from "react-icons/tfi";
import {
   Box,
   Breadcrumb,
   BreadcrumbItem,
   Button,
   Card,
   CardBody,
   CardHeader,
   HStack,
   Heading,
   Stack,
   StackDivider,
   Table,
   TableContainer,
   Tbody,
   Td,
   Text,
   Th,
   Thead,
   Tr,
} from "@chakra-ui/react";
import { useFetch } from "../../../helpers";
import { useEffect } from "react";
import { downloadBase64File } from "../../../utils/downloadFile";
import { useLocalStorage } from "../../../contexts/useLocalStorage";

const DashboardPage = () => {
   const jadwalKuliah = useFetch();
   const rencanaStudi = useFetch();
   const transkripNilai = useFetch();
   const user = useLocalStorage("mahasiswa", null);

   const handleDownloadKRS = () => {
      downloadBase64File(
         rencanaStudi.data?.file,
         `KRS_${rencanaStudi.data?.nim}`,
         ".pdf"
      );
   };

   useEffect(() => {
      jadwalKuliah.get(`/jadwal?kelas=${user[0].kelas}`);
      transkripNilai.get(`/transkrip?nim=${user[0].nim}`);
      rencanaStudi.get(`/transkrip/rencana?nim=${user[0].nim}`);
   }, []);
   return (
      <UserSection title="dashboard">
         <HStack gap="5" bg="white" p="2">
            <Breadcrumb separator="-">
               <BreadcrumbItem>
                  <Text>Semester</Text>
               </BreadcrumbItem>
               <BreadcrumbItem>
                  <Text>
                     {transkripNilai.data !== null &&
                     transkripNilai.data.length > 0 &&
                     transkripNilai.data[0].mahasiswa.semester % 2 === 0
                        ? "Genap"
                        : "Ganjil"}
                  </Text>
               </BreadcrumbItem>
            </Breadcrumb>
         </HStack>
         <HStack my="6" rowGap={10} flexDir={{ base: "column", md: "row" }}>
            <CardSummary title="KRS Mahasiswa">
               <Box
                  h="132"
                  bg="blackAlpha.50"
                  rounded="md"
                  display={"flex"}
                  justifyContent={"center"}
                  align="center"
                  gap="6"
                  px="1"
                  flexDir={"column"}>
                  <Heading fontSize={"16"} mx="auto">
                     <Breadcrumb separator="-">
                        <BreadcrumbItem>
                           <Text>Semester</Text>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                           <Text>
                              {transkripNilai.data !== null &&
                              transkripNilai.data.length > 0 &&
                              transkripNilai.data[0].mahasiswa.semester % 2 ===
                                 0
                                 ? "Genap"
                                 : "Ganjil"}
                           </Text>
                        </BreadcrumbItem>
                     </Breadcrumb>
                  </Heading>
                  <TfiPrinter
                     size="50"
                     color="gray"
                     style={{ alignSelf: "center" }}
                  />
               </Box>
               <Button
                  onClick={handleDownloadKRS}
                  colorScheme="orange"
                  color="white">
                  Cetak KRS
               </Button>
            </CardSummary>
            <CardSummary title="Nilai Komulatif">
               <Stack
                  as="div"
                  rounded={"full"}
                  pos={"relative"}
                  h="150px"
                  w="150px"
                  overflow={"hidden"}>
                  <Wave
                     fill="var(--primary)"
                     paused={false}
                     style={{
                        display: "flex",
                        position: "absolute",
                        bottom: 0,
                     }}
                     options={{
                        amplitude: 20,
                        speed: 0.2,
                        points: 2,
                     }}
                  />
               </Stack>
               <Heading fontSize="18px" align="center">
                  Indeks Prestasi{" "}
                  {transkripNilai.data !== null &&
                     transkripNilai.data.length > 0 &&
                     transkripNilai.data[0].nilai}
               </Heading>
            </CardSummary>
         </HStack>
         {/* schedule */}
         <TableContainer bg="white">
            <HStack p="4" boxShadow={"sm"}>
               <Heading fontSize={"20px"} mx="auto">
                  Jadwal Kuliah
               </Heading>
            </HStack>
            <Table variant="striped" colorScheme="blackAlpha" p="2">
               <Thead>
                  <Tr>
                     <Th w="2%" rowSpan={2}>
                        No.
                     </Th>
                     <Th rowSpan={2}>mata kuliah</Th>
                     <Th rowSpan={2}>sks</Th>
                     <Th rowSpan={2}>dosen</Th>
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
                     <TableLoaderComponent />
                  ) : (
                     jadwalKuliah.data !== null &&
                     jadwalKuliah.data.map((sc, idx) => {
                        const {
                           jadwal_mata_kuliah,
                           dosen_jadwal_kuliah,
                           waktu_jadwal_kuliah,
                           ...rest
                        } = sc;
                        return (
                           <Tr key={rest.id}>
                              <Td w="2%">{idx + 1}</Td>
                              <Td>{rest.mata_kuliah}</Td>
                              <Td>{jadwal_mata_kuliah.sks}</Td>
                              <Td>{dosen_jadwal_kuliah.name}</Td>
                              <Td textAlign="center">{rest.ruangan}</Td>
                              <Td textAlign="center">{rest.hari}</Td>
                              <Td textAlign="center">
                                 {waktu_jadwal_kuliah.waktu_mulai}-
                                 {waktu_jadwal_kuliah.waktu_berakhir}
                              </Td>
                           </Tr>
                        );
                     })
                  )}
               </Tbody>
            </Table>
         </TableContainer>
      </UserSection>
   );
};

const CardSummary = ({ title, children }) => {
   return (
      <Card minW="220px">
         <CardHeader bg="var(--primary)">
            <Heading size="md" color="white" align="center">
               {title}
            </Heading>
         </CardHeader>

         <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
               {children}
            </Stack>
         </CardBody>
      </Card>
   );
};

export default DashboardPage;
