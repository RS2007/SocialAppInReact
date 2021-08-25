//import { Input } from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import { Link } from "react-router-dom";
const Profile = () => {
  const [postPic, setPostPic] = useState(null);
  const [desc, setDesc] = useState("");
  const postPhoto = (e) => {
    setPostPic(e.base64);
  };
  const setDescription = (e) => {
    setDesc(e.target.value);
  };
  const postButton = (e) => {
    const postData = () => {
      fetch("http://localhost/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: postPic,
          userId: "6106212519d56c9e6d3826b0",
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
        <FileBase64 onDone={postPhoto} />
        <Link to="/">
          <Button colorScheme="pink" onClick={postButton}>
            Add Photo
          </Button>
        </Link>
      </FormControl>
    </div>
  );
};

export default Profile;
