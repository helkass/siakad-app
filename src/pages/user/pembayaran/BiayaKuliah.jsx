import { useState } from "react";
import { CardLoaderComponent } from "../../../components/common/LoaderComponent";
import NullBoundary from "../../../components/error/NullBoundary";
import { InputSelectStudi } from "../../../components/common/InputComponent";
import UserSection from "../../../components/layout/UserSection";
import {
   Button,
   Heading,
   VStack,
   HStack,
   Stack,
   Card,
   CardBody,
   Text,
   CardHeader,
   TableContainer,
   Table,
   Thead,
   Tr,
   Th,
   Tbody,
   Td,
   Tfoot,
   Breadcrumb,
   BreadcrumbItem,
   CardFooter,
} from "@chakra-ui/react";
import { currencyFormatter } from "../../../utils/formatter";
import { Link } from "react-router-dom";
import { useFetch } from "../../../helpers";
import { useAuth } from "../../../contexts/useAuth";

export default function BiayaKuliahPage() {
   const [query, setQuery] = useState({});
   const pembayaran = useFetch();
   const { user } = useAuth();

   const handleShowdata = async (e) => {
      e.preventDefault();

      await pembayaran.get(
         `/pembayaran?semester=${query.semester}&tahun=${query.tahun}&nim=${user.nim}`
      );
   };

   const styles = {
      list: {
         py: "2",
         justifyContent: "space-between",
         display: "flex",
      },
      borderB: {
         borderBottom: "1px solid",
         borderBottomColor: "gray.200",
      },
   };

   return (
      <UserSection title="Info Biaya Kuliah">
         <form onSubmit={handleShowdata}>
            <VStack
               bg="white"
               border="1px solid"
               borderColor={"gray.200"}
               rounded="md"
               align="end"
               gap="3"
               p="2">
               <InputSelectStudi
                  setSemester={(s) =>
                     setQuery((prev) => (prev = { ...prev, semester: s }))
                  }
                  setYear={(y) =>
                     setQuery((prev) => (prev = { ...prev, tahun: y }))
                  }
               />
               <Button type="submit" color="white" bg="var(--primary)">
                  Tampilkan Pembayaran
               </Button>
            </VStack>
         </form>
         {/* results */}
         <Stack
            mt={6}
            align={"start"}
            spacing={{ base: 5, md: 1 }}
            direction={{ base: "column", md: "row" }}>
            {pembayaran.isLoading ? (
               <CardLoaderComponent w={{ base: "100%", md: "40%" }} />
            ) : (
               pembayaran.data !== null &&
               pembayaran.data.length > 0 &&
               pembayaran.data.map((item) => {
                  const { tahun_akademik, tagihan_mahasiswa, ...rest } = item;
                  return (
                     <Card w={{ base: "100%", md: "40%" }} key={rest.id}>
                        <CardHeader
                           align="center"
                           bg="var(--primary)"
                           roundedTop="md"
                           color="white">
                           <Heading fontSize={18}>Pembayaran</Heading>
                        </CardHeader>
                        <CardBody>
                           <HStack
                              textTransform={"capitalize"}
                              sx={{ ...styles.list, ...styles.borderB }}>
                              <Text>Semester</Text>
                              <Text>{rest.semester}</Text>
                           </HStack>
                           <HStack sx={{ ...styles.list, ...styles.borderB }}>
                              <Text>Tahun Akademik</Text>
                              <Breadcrumb separator="/">
                                 <BreadcrumbItem>
                                    <Text>{tahun_akademik.tahun_mulai}</Text>
                                 </BreadcrumbItem>
                                 <BreadcrumbItem>
                                    <Text>{tahun_akademik.tahun_akhir}</Text>
                                 </BreadcrumbItem>
                              </Breadcrumb>
                           </HStack>
                           {tagihan_mahasiswa.length > 0 && (
                              <HStack
                                 sx={{ ...styles.list, ...styles.borderB }}>
                                 <Text>Status</Text>
                                 <Text textTransform={"capitalize"}>
                                    {tagihan_mahasiswa[0].status}
                                 </Text>
                              </HStack>
                           )}
                           <HStack sx={styles.list}>
                              <Text>Total</Text>
                              <Text>Rp.{currencyFormatter(rest.jumlah)}</Text>
                           </HStack>
                        </CardBody>
                        {tagihan_mahasiswa[0].status.toLowerCase() ===
                           "belum lunas" && (
                           <CardFooter justify="flex-end">
                              <Link
                                 to={`/mhs/${user.nim}/tagihan`}
                                 style={{
                                    justifySelf: "flex-end",
                                    alignSelf: "flex-end",
                                    marginTop: "30px",
                                 }}>
                                 <Button colorScheme="orange">
                                    Konfirmasi Pembayaran
                                 </Button>
                              </Link>
                           </CardFooter>
                        )}
                     </Card>
                  );
               })
            )}
            {pembayaran.isLoading ? (
               <CardLoaderComponent w={{ base: "100%", md: "60%" }} />
            ) : (
               pembayaran.data !== null &&
               pembayaran.data.length > 0 && (
                  <Card w={{ base: "100%", md: "60%" }}>
                     <CardHeader
                        bg="var(--primary)"
                        roundedTop="md"
                        color="white">
                        <Heading fontSize={18} align="center">
                           Rincian
                        </Heading>
                     </CardHeader>
                     <CardBody>
                        {pembayaran.data[0].detail_pembayaran !== null ? (
                           <TableContainer>
                              <Table variant={"striped"} colorScheme="gray">
                                 <Thead>
                                    <Tr>
                                       <Th>No.</Th>
                                       <Th>nama</Th>
                                       <Th>jumlah</Th>
                                    </Tr>
                                 </Thead>
                                 <Tbody>
                                    {pembayaran.data[0].detail_pembayaran
                                       .filter(
                                          (detail) =>
                                             detail.jurusan === user.jurusan
                                       )
                                       .map((item, idx) => (
                                          <Tr key={item.id}>
                                             <Td>{idx + 1}</Td>
                                             <Td>{item.name}</Td>
                                             <Td>
                                                Rp.
                                                {currencyFormatter(
                                                   item.nominal
                                                )}
                                             </Td>
                                          </Tr>
                                       ))}
                                 </Tbody>
                                 <Tfoot>
                                    <Tr fontWeight={"600"}>
                                       <Td colSpan="2">Total</Td>
                                       <Td>
                                          Rp.
                                          {currencyFormatter(
                                             pembayaran.data[0].jumlah
                                          )}
                                       </Td>
                                    </Tr>
                                 </Tfoot>
                              </Table>
                           </TableContainer>
                        ) : (
                           <NullBoundary />
                        )}
                     </CardBody>
                  </Card>
               )
            )}
         </Stack>
      </UserSection>
   );
}
