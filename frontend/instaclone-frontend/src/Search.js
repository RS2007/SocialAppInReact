import { Flex, Box, Input, Image } from "@chakra-ui/react";
import { useState } from "react";
import useFetch from "./useFetch";
const Search = () => {
  const fetchUsers = useFetch("http://localhost/user/");
  const userList = fetchUsers.imageList;
  const userLoading = fetchUsers.loading;
  const userError = fetchUsers.error;
  const changeSearchText = (e) => {
    setSearchText(e.target.value);
  };
  const [searchText, setSearchText] = useState("");
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
        {userLoading && <div>Loading....(Please wait :) )</div>}
        {!userLoading &&
          userList.map((elem) => (
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
              <Flex align="center" width="20%" color="#199ff6" cursor="pointer">
                Follow
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default Search;
