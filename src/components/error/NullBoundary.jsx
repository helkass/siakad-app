import { Heading, Stack } from "@chakra-ui/react";

const NullBoundary = () => {
   return (
      <Stack bg="azure" py="6">
         <Heading fontSize="20" align="center">
            Data Not Found
         </Heading>
      </Stack>
   );
};

export default NullBoundary;
