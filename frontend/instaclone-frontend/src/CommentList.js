import { useParams,useHistory } from "react-router-dom";
import {
  Flex,
  HStack,
  VStack,
  Box,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
const CommentList = (props) => {

  const history=useHistory();

  // ! Getting stuff from props
  const {peopleList,peopleLoading,peopleError}=props.peopleObj;
  const {commentListAll,commentLoading,commentError}=props.commentObj;

  // ! PostId extraction from parameters
  const postId = useParams().id;

  // ! States
  const [commentValue, setCommentValue] = useState("");


  const commentList =
    !commentLoading &&
    commentListAll.filter((elem) => elem.postId === postId);
  
  // * Handling the Like
  const likeComment=(id) => {
    axios.put("http://localhost:1234/comment/like/"+id,{
      
    },
    {withCredentials: true,}).then(data=>{console.log(data)}).catch(err=>{console.log(err.message)}); 
    window.location.reload();
  }

  // * Handling the comment delete
  // ! delete not sending a cookie thus need a body
  const deleteComment=(id) => {
    axios.delete("http://localhost:1234/comment/delete/"+id,{
      data: {userId: jwt_decode(document.cookie).userId}
    },{withCredentials: true}).then(data => {console.log(data)}).catch(err => {console.log(err.message)});
    window.location.reload();
  }
 
  if(!document.cookie.match('jwt')) {
    history.push("/login")
    window.location.reload();
  } 
  const userId=jwt_decode(document.cookie).userId;
  

  const changeCommentValue = (e) => {
    setCommentValue(e.target.value);
  };
  //const onSubmit = () => {
  //  fetch("http://localhost:1234/comment/", {
  //    method: "POST",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //    credentials: "include",
  //    body: JSON.stringify({
  //      postId: postId,
  //      userId: userId,
  //      commentBody: commentValue,
  //    }),
  //  });
  //  window.location.reload(false);
  //};

  const onSubmit=() => {
    axios.post("http://localhost:1234/comment/",{
      postId: postId,
      userId: userId,
      commentBody: commentValue,
    },{withCredentials: true}).then(data => {console.log(data)}).catch(err => {console.log(err.message)});
    window.location.reload();
  }
  
  return (
    <Flex align="center" justify="center" direction="column">
      <Flex
        w={["100%", "85%"]}
        height="16vh"
        background="white"
        mt={10}
        pt={1}
        maxW="614px"
      >
        <VStack w="100%" pt={2}>
          <HStack w="100%">
            <Flex w="15%" align="center" justify="center">
              <p>Image</p>
            </Flex>
            <Flex w="80%">
              <Input
                placeholder="Write a comment?"
                bg="#F0F2F5"
                w="95%"
                value={commentValue}
                onChange={changeCommentValue}
              />
            </Flex>
          </HStack>
          <Flex direction="row-reverse" align="right" w="76%">
            <Button colorScheme="blue" onClick={onSubmit}>
              POST
            </Button>
          </Flex>
        </VStack>
      </Flex>
      {commentLoading && <div>Loading....</div>}
      {!commentLoading &&
        commentList.map((elem) => (
          <HStack
            w={["95%", "85%"]}
            maxW="614px"
            background="white"
            mt={10}
            height="20vh"
          >
            <Flex height="10%" justify="center" align="center" w="15%">
              <Image
                src={
                  !peopleLoading &&
                  peopleList &&
                  peopleList.find((people) => people._id === elem.userId)
                    .profilePicture
                }
              />
            </Flex>
            <Flex
              direction="column"
              height="70%"
              justify="space-between"
              w="78%"
            >
              <Box height="30%" fontSize={15} fontWeight="bold" pl={2} mb={2}>
                {!peopleLoading &&
                  peopleList &&
                  peopleList.find((people) => people._id === elem.userId)
                    .username}
              </Box>
              <Flex
                height="70%"
                fontSize={17}
                background="#E5ECEC"
                borderRadius="10px"
                pr={2}
                pl={2}
                fontWeight="500"
                mb={2}
                alignItems="center"
              >
                <Box>{elem.commentBody}</Box>
              </Flex>
              <Flex height="30%">
                <Box
                  mr={5}
                  onClick={() => {
                    deleteComment(elem._id);
                  }}
                  cursor="pointer"
                >
                  Delete
                </Box>
                {elem.likes.find(
                  (like) => like === jwt_decode(document.cookie).userId
                ) ? (
                  <Box
                    onClick={() => {
                      likeComment(elem._id);
                    }}
                    color="red"
                    cursor="pointer"
                  >
                    Like
                  </Box>
                ) : (
                  <Box
                    onClick={() => {
                      likeComment(elem._id);
                    }}
                    cursor="pointer"
                  >
                    Like
                  </Box>
                )}
              </Flex>
            </Flex>
          </HStack>
        ))}
    </Flex>
  );
};

export default CommentList;
