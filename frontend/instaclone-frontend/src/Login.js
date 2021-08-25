import { Flex, Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = async () => {
    try {
      const data = await fetch("http://localhost/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: email, password: password }),
      });
      const userId = jwt_decode(document.cookie).userId;
      const user = await fetch("http://localhost/user/" + userId);
      if (!user.ok) {
        throw Error("this is an error");
      }
      console.log(await data.json());
    } catch (err) {
      console.log(err.message);
      history.push("/login");
    }
  };
  return (
    <Flex direction="column" align="center" justify="center">
      <Flex direction="column" mt={10} w="30%">
        <Box fontSize="30px" fontWeight="bold">
          <h1>Login</h1>
        </Box>
        <Flex align="center" justify="center" direction="column">
          <Input
            background="white"
            variant="outline"
            mb={2}
            mt={2}
            placeholder="Enter email"
            value={email}
            onChange={changeEmail}
          />
          <Input
            type="password"
            background="white"
            variant="outline"
            placeholder="Enter password"
            value={password}
            onChange={changePassword}
          />
        </Flex>
      </Flex>
      <Box w="30%" mt={2}>
        <Link to="/">
          <Button colorScheme="blue" color="white" onClick={login}>
            Login
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
