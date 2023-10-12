import { Link as RouterDom } from "react-router-dom";
import logo from "../../../assets/university-logo.png";
import {
   Image,
   Container,
   Heading,
   HStack,
   Button,
   Stack,
   Link as ChakraLink,
} from "@chakra-ui/react";

const HeaderComponent = () => {
   return (
      <Stack as="header" boxShadow={"sm"}>
         <Container
            maxW={"7xl"}
            as={"div"}
            display={"flex"}
            py="10px"
            justifyContent={"space-between"}
            alignItems={"center"}>
            <HStack gap={"10px"}>
               <ChakraLink to={"/"} as={RouterDom}>
                  <Image
                     loading="lazy"
                     boxSize={{ base: "35px", md: "50px" }}
                     objectFit={"cover"}
                     src={logo}
                     alt="logo univ"
                  />
               </ChakraLink>
               <Heading as="h1" fontSize={{ base: "18px", md: "24px" }}>
                  Siakad <span>IAI Al Muhammad</span>
               </Heading>
            </HStack>
            <HStack gap={"20px"}>
               <ChakraLink to="/login" as={RouterDom}>
                  Masuk
               </ChakraLink>
               <ChakraLink to="/registrasi" as={RouterDom}>
                  <Button
                     sx={{ backgroundColor: "var(--primary)" }}
                     color="white">
                     Daftar
                  </Button>
               </ChakraLink>
            </HStack>
         </Container>
      </Stack>
   );
};

export default HeaderComponent;
