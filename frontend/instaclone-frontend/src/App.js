import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Posting from "./Posting";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./Profile,";
import CommentList from "./CommentList";
import Login from "./Login";
function App() {
  return (
    <Router>
      <ChakraProvider>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Posting />
            <Posts />
          </Route>
          <Route path="/upload">
            <Profile />
          </Route>
          <Route path="/post/:id">
            <CommentList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
