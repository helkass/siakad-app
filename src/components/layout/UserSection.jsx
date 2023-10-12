import { Heading, Stack } from "@chakra-ui/react";

const UserSection = ({ title, children }) => {
   return (
      <Stack bg="blackAlpha.50" spacing={"20px"} p={{ base: 2, md: 5 }}>
         <Heading fontSize={"20px"} textTransform={"capitalize"}>
            {title}
         </Heading>
         <Stack py="1rem">{children}</Stack>
      </Stack>
   );
};

export default UserSection;
