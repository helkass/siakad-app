import { AiOutlineScan, AiOutlineSchedule } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
import { RiBillLine } from "react-icons/ri";
import { SiAuthy } from "react-icons/si";
import { FaRegListAlt } from "react-icons/fa";
import {
   Container,
   Heading,
   Box,
   Text,
   Stack,
   SimpleGrid,
} from "@chakra-ui/react";

const LayananComponent = () => {
   return (
      <Container maxW="6xl" as="section" id="layanan" my="70px">
         <Stack display="flex" flexDirection={"column"}>
            <Box
               className="layanan-header"
               w="100%"
               textAlign={"center"}
               mb="3rem">
               <Heading>Fitur & Layanan</Heading>
               <Text as="span">
                  fitur dan layanan pada aplikasi Siakad Mahasiswa IAI Al
                  Muhammad Cepu
               </Text>
            </Box>
            <SimpleGrid columns={[2, null, 4]} spacing="20px">
               {layananLists.map((item, idx) => (
                  <LayananCard {...item} key={idx} />
               ))}
            </SimpleGrid>
         </Stack>
      </Container>
   );
};

const LayananCard = ({ Icon, desc }) => {
   return (
      <Box
         gap="20px"
         rounded={"md"}
         boxShadow={"md"}
         textAlign="center"
         w={{ base: "180px", md: "220px" }}
         p="12px">
         <Box
            h={"90px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            rounded="lg"
            mb="12px"
            bg="gray.50">
            <Icon size={35} style={{ margin: "0 auto" }} />
         </Box>
         <Text>{desc}</Text>
      </Box>
   );
};

const layananLists = [
   {
      Icon: AiOutlineScan,
      desc: "Scan kode presensi otomatis",
   },
   {
      Icon: PiStudentBold,
      desc: "Informasi data Mahasiswa",
   },
   {
      Icon: RiBillLine,
      desc: "Informasi Pembayaran perkuliahan",
   },
   {
      Icon: SiAuthy,
      desc: "Autentikasi mahasiswa",
   },
   {
      Icon: FaRegListAlt,
      desc: "Informasi nilai mahasiswa",
   },
   {
      Icon: AiOutlineSchedule,
      desc: "Informasi penjadwalan mahasiswa",
   },
];

export default LayananComponent;
