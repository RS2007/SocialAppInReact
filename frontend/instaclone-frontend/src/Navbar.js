import { HStack, Box, Flex, Image } from "@chakra-ui/react";
import logo from "./logo.png";
import { BsPeopleFill } from "react-icons/bs";
import { AiTwotoneMessage } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const logout = () => {
    document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    history.push("/login");
  };
  return (
    <HStack justify="space-between" bg="#4167B1" color="white">
      <HStack height="8.1vh" width="70%">
        <Box>
          <Link to="/home">
            <Image src={logo} w={10} h={10} ml={2} />
          </Link>
        </Box>
        <Box fontSize={20} pl={5}>
          <b>Hello World!</b>
        </Box>
      </HStack>
      <Flex
        height="8.1vh"
        width="30%"
        flexDirection="row"
        justify="space-evenly"
        maxWidth="200px"
        align="center"
      >
        <BsPeopleFill size={30} />
        <AiTwotoneMessage size={30} onClick={logout} />
      </Flex>
    </HStack>
  );
};

export default Navbar;
//#0573E6
//103 - 1271
