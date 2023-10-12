import {
   Image,
   VStack,
   Box,
   FormControl,
   FormLabel,
   Input,
   FormHelperText,
   Button,
} from "@chakra-ui/react";
import UserSection from "../../../components/layout/UserSection";
import AlertComponent from "../../../components/common/AlertComponent";
import user_image from "../../../assets/user.jpg";
import { useState } from "react";
import { getBase64 } from "../../../utils/base64Converter";
import { useFetch } from "../../../helpers";
import { useAuth } from "../../../contexts/useAuth";

const PhotoProfile = () => {
   const [file, setFile] = useState(null);
   const { update, isLoading, isError, message } = useFetch();
   const { user } = useAuth();
   const [showAlert, setShowAlert] = useState(false);

   const handleSubmit = (event) => {
      event.preventDefault();

      getBase64(file, (result) => {
         update(`/mahasiswa/${user.id}`, { profilePic: result });

         setTimeout(() => {
            setShowAlert(true);
         }, 500);
      });
   };

   return (
      <UserSection title={"Foto Profile"}>
         <VStack bg="white" p="2" gap={5} align="left">
            <AlertComponent
               isShow={showAlert}
               type={isError ? "error" : "success"}
               title="Update Status"
               message={message}
            />
            <Box>
               <Image
                  src={file === null ? user_image : URL.createObjectURL(file)}
                  boxSize={"220px"}
               />
            </Box>
            <form onSubmit={handleSubmit}>
               <FormControl>
                  <FormLabel htmlFor="image">Ganti Foto Profile</FormLabel>
                  <Input
                     type="file"
                     name="image"
                     id="image"
                     border="none"
                     px="2"
                     py="1"
                     accept=".jpg, .png, .jpeg"
                     onChange={(e) => setFile(e.target.files[0])}
                  />
                  <FormHelperText>
                     Max Size 2MB | ext file includes .jpg .png .jpeg
                  </FormHelperText>
               </FormControl>
               <Button
                  isLoading={isLoading}
                  loadingText="updating..."
                  isDisabled={isLoading || file === null}
                  variant="outline"
                  mt="2"
                  type="submit"
                  bg="green.500"
                  color="white">
                  Upload
               </Button>
            </form>
         </VStack>
      </UserSection>
   );
};

export default PhotoProfile;
