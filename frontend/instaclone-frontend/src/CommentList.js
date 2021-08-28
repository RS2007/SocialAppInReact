import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Flex, HStack, VStack, Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
const CommentList = () => {
  const postId = useParams().id;
  const [commentValue, setCommentValue] = useState("");
  const commentFetch = useFetch("http://localhost/comment");
  const commentError = commentFetch.error;
  const commentLoading = commentFetch.loading;
  const commentList =
    !commentFetch.loading &&
    commentFetch.imageList.filter((elem) => elem.postId === postId);
  const peopleFetch = useFetch("http://localhost/user");
  const peopleError = peopleFetch.error;
  const peopleLoading = peopleFetch.loading;
  const peopleList = peopleFetch.imageList;
  const editComment = () => {
    console.log("This is to edit the comment");
  };
  const deleteComment = (id) => {
    console.log("This is to delete the comment");
    fetch("http://localhost/comment/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: jwt_decode(document.cookie).userId,
      }),
    });
    window.location.reload();
  };
  console.log(
    commentList,
    peopleList,
    commentError,
    peopleError,
    peopleLoading,
    commentLoading
  );
  const userId = jwt_decode(document.cookie).userId;
  const changeCommentValue = (e) => {
    setCommentValue(e.target.value);
  };
  const onSubmit = () => {
    fetch("http://localhost/comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        commentBody: commentValue,
      }),
    });
    window.location.reload(false);
  };

  return (
    <Flex align="center" justify="center" direction="column">
      <Flex
        w={["95%", "85%"]}
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
              <p>Image</p>
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
                height="65%"
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
                <Box mr={5} onClick={editComment} cursor="pointer">
                  Edit
                </Box>
                <Box
                  onClick={() => {
                    deleteComment(elem._id);
                  }}
                  cursor="pointer"
                >
                  Delete
                </Box>
              </Flex>
            </Flex>
          </HStack>
        ))}
    </Flex>
  );
};

export default CommentList;
