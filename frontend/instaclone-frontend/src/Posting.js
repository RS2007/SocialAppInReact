import { Divider, Flex, HStack, Box, Input } from "@chakra-ui/react";
import { FaBeer } from "react-icons/fa";
import { AiFillVideoCamera } from "react-icons/ai";
import { GoDeviceCamera } from "react-icons/go";
import { useState } from "react";
const Posting = () => {
  const [captionInput, setCaptionInput] = useState("");
  const changeCaptionValue = (e) => {
    setCaptionInput(e.target.value);
  };

  return (
    <Flex mt={10} w="100%" h="10vh" alignItems="center" justifyContent="center">
      <Flex
        w="80%"
        backgroundColor="white"
        direction="column"
        height="14vh"
        maxW="614px"
      >
        <HStack spacing="10%" height="50%" mb={5} pl="5%">
          <Flex justify="center" align="center">
            <Flex w="100%" justify="center" align="center">
              <FaBeer color="red" size={30} />
            </Flex>
          </Flex>
          <Box w="100%">
            <Input
              placeholder="Whats on your mind?"
              bg="#F0F2F5"
              w="90%"
              value={captionInput}
              onChange={changeCaptionValue}
            ></Input>
          </Box>
        </HStack>
        <Divider />
        <HStack>
          <HStack spacing="5%" w="50%" ml="5%">
            <Box>
              <AiFillVideoCamera color="#F02849" size={30} />
            </Box>
            <Box>
              <p>Live Media</p>
            </Box>
          </HStack>
          <Divider orientation="vertical" />
          <HStack spacing="5%" w="50%" ml="5%">
            <Box>
              <GoDeviceCamera color="#45BD62" size={30} />
            </Box>
            <Box>
              <p>Media</p>
            </Box>
          </HStack>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Posting;
