import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Posting from "./Posting";
function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Posting />
      <Posts />
    </ChakraProvider>
  );
}

export default App;
