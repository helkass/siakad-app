import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsArrowUpLeftSquare } from "react-icons/bs";

const ErrorPage = () => {
   const navigate = useNavigate();
   return (
      <Container maxW="7xl">
         <Stack justify="center" align="center" minH="100vh">
            <Stack spacing={12} bg="red.50" p="40" rounded="md" boxShadow="sm">
               <Heading>Page Not Found!</Heading>
               <Button
                  colorScheme="red"
                  gap={3}
                  type="button"
                  onClick={() => navigate(-1)}>
                  <BsArrowUpLeftSquare size={20} />
                  Back To Preveous Page
               </Button>
            </Stack>
         </Stack>
      </Container>
   );
};

export default ErrorPage;
