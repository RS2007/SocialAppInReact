//import { Input } from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import { Box,Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
const PhotoUpload = () => {

  const history=useHistory();

  // ! States
  const [postPic, setPostPic] = useState(null);
  const [desc, setDesc] = useState("");

  // ! Handle posting form
  const postPhoto = (e) => {
    setPostPic(e.base64);
  };

  // ! Handle desc form
  const setDescription = (e) => {
    setDesc(e.target.value);
  };

  // ! Handling the cookie
  if(!document.cookie.match("jwt")) {
    history.push("/login");
    window.location.reload();
  }
  const userId = jwt_decode(document.cookie).userId;

  // ! Posting button handler
  const postButton = (e) => {
    const postData = () => {
      fetch("http://localhost:1234/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: postPic,
          userId: userId,
          desc: desc,
        }),
      });
    };
    postData();
  };
  

  return (
    <div>
      <FormControl id="desc">
        <FormLabel>Description</FormLabel>
        <Input type="text" value={desc} onChange={setDescription} />
        <Box marginTop="20px">
        <FileBase64 onDone={postPhoto} />
        <Link to="/home">
          <Button colorScheme="pink" onClick={postButton} width="15%" minWidth="75px" maxWidth="113px">
            Upload 
          </Button>
        </Link>
        </Box>
      </FormControl>
    </div>
  );
};

export default PhotoUpload;
