import {
   AiFillYoutube,
   AiFillInstagram,
   AiOutlineTwitter,
   AiFillFacebook,
} from "react-icons/ai";
import { Container, Heading, HStack, Stack } from "@chakra-ui/react";

const FooterComponent = () => {
   return (
      <Stack as="footer" bg="gray.300" py="30px">
         <Container maxW="7xl">
            <Heading as="h6" mb="15px" fontSize={"md"}>
               Siakad IAI AL Muhammad Cepu
            </Heading>
            <HStack align={"center"}>
               {socials.map((item, idx) => (
                  <SocialIcon {...item} key={idx} />
               ))}
            </HStack>
         </Container>
      </Stack>
   );
};

const SocialIcon = ({ Icon, ...props }) => {
   return (
      <a target="_blank" className="footer-social-icon" {...props}>
         <Icon size={20} />
      </a>
   );
};

const socials = [
   {
      href: "https://www.youtube.com/@iaialmuhammadcepu",
      Icon: AiFillYoutube,
   },
   {
      href: "https://instagram.com/iai_amc?igshid=MzRlODBiNWFlZA==/",
      Icon: AiFillInstagram,
   },
   {
      href: "https://twitter.com/iai_amc",
      Icon: AiOutlineTwitter,
   },
   {
      href: "https://www.facebook.com/profile.php?id=100093226027998",
      Icon: AiFillFacebook,
   },
];

export default FooterComponent;
