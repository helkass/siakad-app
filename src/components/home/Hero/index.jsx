import heroImage from "../../../assets/hero-image.png";
import { Link as RouterDom } from "react-router-dom";
import {
   Container,
   HStack,
   Box,
   Heading,
   Text,
   Button,
   Link as ChakraLink,
   Image,
} from "@chakra-ui/react";

const HeroComponent = () => {
   return (
      <Container as="section" maxW={"7xl"} my="2rem">
         <HStack
            as={"div"}
            gap={"30px"}
            flexDirection={{ md: "row", base: "column" }}>
            <Box as="div" sx={styles.leftContent}>
               <Heading
                  fontSize={{ base: "1.8rem", md: "3rem" }}
                  sx={styles.textResponsive}>
                  Sistem Informasi Akademik Mahasiswa IAI AL Muhammad
               </Heading>
               <Text
                  w="90%"
                  mx={{ base: "auto", md: 0 }}
                  sx={styles.textResponsive}>
                  Meningkatkan dan mempermudah mahasiswa Intitut Agama Islam Al
                  Muhammad Cepu dalam mengakses informasi terkait perkuliahan.
               </Text>
               <ChakraLink
                  to="/registrasi"
                  as={RouterDom}
                  mx={{ base: "auto", md: 0 }}
                  my="20px">
                  <Button
                     sx={{ backgroundColor: "var(--primary)" }}
                     color="white">
                     Daftar Sekarang
                  </Button>
               </ChakraLink>
            </Box>
            <Image
               maxW={"550px"}
               loading="lazy"
               src={heroImage}
               alt="banner image"
            />
         </HStack>
      </Container>
   );
};

const styles = {
   leftContent: {
      width: { xl: "50%" },
      display: "flex",
      flexDirection: "column",
      lineHeight: "1.8rem",
      gap: "15px",
      justifyContent: { base: "center", md: "left" },
      my: { base: "1.8rem", xl: 0 },
   },
   textResponsive: {
      textAlign: { base: "center", md: "start" },
   },
};

export default HeroComponent;
