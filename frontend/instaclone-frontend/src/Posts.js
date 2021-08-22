import { Box, Flex, Image } from "@chakra-ui/react";
import post1 from "./post1.jpg";
const Posts = () => {
  return (
    <Flex align="center" justify="center">
      <Flex
        direction="column"
        mt={10}
        justify="center"
        align="center"
        w="80%" //{["85%", 500, "80%"]}
        maxW="614px"
      >
        <Flex justify="space-between" w="100%" background="white">
          <Box w="22%">
            <p>Image</p>
          </Box>
          <Box w="90%">
            <p>Dino posted an image</p>
          </Box>
        </Flex>
        <Flex
          align="center"
          justify="center"
          w="100%" //{["100%", 500, "80%"]}
          maxW="614px"
        >
          <Image src={post1} h="auto" m="auto" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Posts;
