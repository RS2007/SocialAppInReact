import { Flex, Box, Input, Image } from "@chakra-ui/react";
import jwt_decode from "jwt-decode"
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Search = (props) => {

  const history=useHistory();

  // ! States
  const [searchText,setSearchText] = useState("");

  // ! People List
  const {peopleList,peopleLoading,peopleError}=props.peopleObj;

  // ! Search text handle
  const changeSearchText = (e) => {
    setSearchText(e.target.value);
    if (searchText.length > 0) {
      peopleList.filter((user) => {
      return user.username.match(searchText);
  });
  }
  };
  
  // ! Cookie after a render
  if(!document.cookie.match("jwt")) {
    history.push("/login");
    window.location.reload();
  }
  const userId = jwt_decode(document.cookie).userId;

  // ! Follow Button handler
  const follow = async (id)=>{

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
        alert("Unable to connect to servers");
      } else {
        window.location.reload();
        alert("Unfollowed succesfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  

  
  return (
    <Flex align="center" direction="column" justify="center">
      <Flex
        direction="column"
        mt={10}
        align="center"
        w={["95%", "85%", "85%"]}
        maxW="614px"
        background="white"
        height="80vh"
      >
        <Box mt={10} width={["100%", "80%", "80%"]}>
          <Input
            placeholder="Search for users"
            value={searchText}
            onChange={changeSearchText}
          />
        </Box>
        {peopleLoading && <div>Loading....(Please wait :) )</div>}
        {!peopleLoading &&
          peopleList.map((elem,keys) => (
            <Flex
              mt={10}
              width={["90%", "80%", "80%"]}
              background="#E5ECEC"
              height="10vh"
              direction="row"
              align="center"
              justify="space-between"
              fontSize={[13, 14, 16]}
            >
              <Flex width="80%" align="center">
                <Box width="30%">
                  <Image
                    src={elem.profilePicture}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
                <Flex align="center" width="60%" ml={5}>
                  {elem.username}
                </Flex>
              </Flex>
              <Flex align="center" width="20%" color="#199ff6" cursor="pointer" onClick={()=>{follow(elem._id)}}>
                {elem.followers.find(elem=>elem === userId )?"Unfollow":"Follow"}
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default Search;
