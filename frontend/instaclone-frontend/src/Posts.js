import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link,useHistory } from "react-router-dom";
import post1 from "./post1.jpg";
import useFetch from "./useFetch";
import jwt_decode from "jwt-decode";

const Posts = (props) => {

  const history=useHistory();

  const imageFetch = useFetch("http://localhost:1234/post");
  const imageList = imageFetch.data;
  const {error,loading}=imageFetch;

  //const peopleFetch = useFetch("http://localhost:1234/user");
  //const peopleError = peopleFetch.error;
  //const peopleLoading = peopleFetch.loading;
  //const peopleList = peopleFetch.imageList;
  //const commentFetch = useFetch("http://localhost:1234/comment");
  //const commentList = commentFetch.imageList;
  //const commentLoading = commentFetch.loading;

  const {peopleList,peopleLoading,peopleError}=props.peopleObj;
  const {commentListAll,commentLoading,commentError}=props.commentObj;

  if(!document.cookie.match("jwt")) {
    history.push("/login");
    window.location.reload();
  }

  const liking = async (id) => {
    console.log("This is a like");
    const data = await fetch("http://localhost:1234/post/like/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: jwt_decode(document.cookie).userId,
      }),
    });
    const msg = await data.clone().json();
    window.location.reload();
  };

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
            w="85%" //{["85%", 500, "80%"]}
            maxW="614px"
          >
            <Flex justify="space-between" w="100%" background="white" height="5vh" paddingTop="5px">
              <Box width="10%" borderRaduis="50%">
                <Image
                  src={
                    !peopleLoading &&
                    peopleList.find((people) => people._id === elem.userId)
                      .profilePicture
                  }
                  width="100%"
                  height="auto"
                  display="inline"
                  objectFit="contain"
                  marginLeft="2%"
                 
                />
              </Box>
              <Box w="25%" marginLeft = "2%">
                <p>
                  {!peopleLoading &&
                    peopleList.find((people) => people._id === elem.userId)
                      .username}
                </p>
              </Box>
              <Box w="76%">
                <p>{elem.desc}</p>
              </Box>
            </Flex>
            <Flex
              align="center"
              justify="center"
              w="100%" //{["100%", 500, "80%"]}
              maxW="614px"
              direction="column"
              border="2px"
            >
              {!loading && <Image src={elem.image} h="auto" w="100%" />}
              <Flex w="100%" border="2px">
                <Box>Likes: {elem.likes.length}</Box>
                <Box ml={2}>
                  Comments:
                  {!commentLoading &&
                    commentListAll.filter((comment) => comment.postId === elem._id)
                      .length}
                </Box>
              </Flex>
              <HStack
                direction="row"
                justify="space between"
                w="100%"
                border="2px"
                spacing="10px"
                height="5vh"
              >
                {console.log(
                  elem.likes.find(
                    (elem) => elem === jwt_decode(document.cookie).userId
                  )
                )}
                {elem.likes.find(
                  (elem) => elem === jwt_decode(document.cookie).userId
                ) ? (
                  <AiFillHeart
                    size={30}
                    onClick={() => {
                      liking(elem._id);
                    }}
                    color="red"
                    cursor="pointer"
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    onClick={() => {
                      liking(elem._id);
                    }}
                    cursor="pointer"
                  />
                )}

                <Link to={`/post/${elem._id}`}>
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
