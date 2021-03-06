import { Box, Flex, Input, HStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const FriendList = (props) => {
  const {peopleList,peopleLoading,peopleError}=props.peopleObj;
  const [searchText, setSearchText] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const history = useHistory();
  const changeSearchText = (e) => {
    setSearchText(e.target.value);

  };
  if(!document.cookie.match("jwt")) {
    history.push("/login");
    window.location.reload();
  }
  const userId = jwt_decode(document.cookie).userId;
  const getUserFromId = (id) => {
    return peopleList.find((elem) => elem._id === id);
  };
  const following =
    !peopleLoading &&
    peopleList.find((elem) => userId === elem._id).following.map((elem) => elem);
  const followingUsername =
    !peopleLoading &&
    following.map((elem) => getUserFromId(elem)).map((elem) => elem);
  const followers =
    !peopleLoading &&
    peopleList.find((elem) => userId === elem._id).followers.map((elem) => elem);
  const followersUsername =
    !peopleLoading &&
    followers.map((elem) => getUserFromId(elem)).map((elem) => elem.username);
  const followingPerson = () => {
    console.log("Hello");
  };
  const showAllFollowers = () => {
    console.log("to show users");
    setShowFollowers(true);
  };
  const showAllFollowing = () => {
    setShowFollowers(false);
  };
  const unfollowUser = async (id) => {
    try {
      const data = await fetch("http://localhost:1234/user/follow/" + id, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: jwt_decode(document.cookie).userId,
        }),
      });
      if (!data.ok) {
        document.alert("Unable to connect to servers");
      } else {
        window.location.reload();
        document.alert("Unfollowed succesfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Flex align="center" justify="center" direction="column">
      <Flex
        direction="column"
        mt={10}
        //justify="center"
        align="center"
        w={["95%", "85%", "85%"]} //{["85%", 500, "80%"]}
        maxW="614px"
        background="white"
        height="80vh"
      >
        <Box mt={10} width={["100%", "80%", "80%"]}>
          <Input
            placeholder="Search for users"
            value={searchText}
          />
        </Box>
        {peopleLoading && <Box>Loading....</Box>}
        <HStack spacing="10%">
          <Box
            cursor="pointer"
            onClick={showAllFollowing}
            borderBottom={!showFollowers ? "2px solid blue" : ""}
          >
            Following
          </Box>
          <Box
            cursor="pointer"
            onClick={showAllFollowers}
            borderBottom={showFollowers ? "2px solid blue" : ""}
          >
            Followers
          </Box>
        </HStack>
        {!showFollowers &&
          !peopleLoading &&
          followingUsername.map((elem) => (
            <Flex
              mt={10}
              width={["98%", "80%", "80%"]}
              background="#E5ECEC"
              height="10vh"
              direction="row"
              align="center"
              justify="space-between"
              fontSize={[13, 14, 16]}
            >
              <Flex>
                <Box width="30%">
                  <Image
                    src={elem.profilePicture}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
                <Flex align="center" width="45%" ml={5}>
                  {elem.username}
                </Flex>
              </Flex>
              <Flex
                align="center"
                width="20%"
                color="#199ff6"
                onClick={() => {
                  unfollowUser(elem._id);
                }}
                cursor="pointer"
                position = "relative"
                right="5%"
              >
               Unfollow 
              </Flex>
            </Flex>
          ))}
        {showFollowers &&
          !peopleLoading &&
          followersUsername.map((elem) => (
            <Flex
              mt={10}
              width={["100%", "80%", "80%"]}
              background="#E5ECEC"
              height="8vh"
              direction="row"
              align="center"
              justify="space-between"
              fontSize={[13, 14, 16]}
            >
              <Flex>
                <Box width="22%">
                  <Image
                    src={elem.profilePicture}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
                <Flex align="center" width="50%">
                  {elem.username}
                </Flex>
              </Flex>
              <Flex align="center" width="20%" color="#199ff6" position = "relative"
                right="5%">
                Follow
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default FriendList;
