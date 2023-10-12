import { useToast } from "@chakra-ui/react";
/**
 *
 * @param {type} param0 boolean
 * @param {message} param1 string
 * @returns Alert Component
 */
const AlertComponent = ({ type, message, title, isShow }) => {
   const toast = useToast();

   isShow &&
      toast({
         title: title,
         description: message,
         status: type,
         duration: 4000,
         isClosable: true,
      });
};

export default AlertComponent;
