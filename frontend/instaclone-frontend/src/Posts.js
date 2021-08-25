import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import post1 from "./post1.jpg";
import useFetch from "./useFetch";

const Posts = () => {
  const { imageList, error, loading } = useFetch("http://localhost/post");
  console.log(imageList, error, loading);
  return (
    <Flex align="center" justify="center" direction="column">
      <Flex
        direction="column"
        mt={10}
        justify="center"
        align="center"
        w="80%" //{["85%", 500, "80%"]}
        maxW="614px"
        background="white"
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
          direction="column"
        >
          <Image src={post1} h="auto" m="auto" />
          <HStack
            direction="row"
            justify="space between"
            w="100%"
            border="2px"
            spacing="10px"
            height="5vh"
          >
            <AiOutlineHeart size={30} />
            {/*<Link to={imageURL}>*/}
            <IoChatbubbleOutline size={30} />
            {/*</Link>*/}
          </HStack>
        </Flex>
      </Flex>
      {error && <div>{error}</div>}
      {loading && <div>Loading....</div>}
      {!loading &&
        imageList.map((elem) => (
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
              direction="column"
            >
              {!loading && <Image src={elem.image} h="auto" m="auto" />}
              <HStack
                direction="row"
                justify="space between"
                w="100%"
                border="2px"
                spacing="10px"
                height="5vh"
              >
                <AiOutlineHeart size={30} />
                <Link to={"post/" + elem._id}>
                  <IoChatbubbleOutline size={30} />
                </Link>
              </HStack>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};

export default Posts;
