import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Posting from "./Posting";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CommentList from "./CommentList";
import Login from "./Login";
import PhotoUpload from "./PhotoUpload";
import FriendList from "./FriendList";
import Search from "./Search";
function App() {
  return (
    <Router>
      <ChakraProvider>
        <Navbar />
        <Switch>
          <Route exact path="/home">
            <Posting />
            <Posts />
          </Route>
          <Route path="/upload">
            <PhotoUpload />
          </Route>
          <Route path="/friends">
            <FriendList />
          </Route>
          <Route path="/post/:id">
            <CommentList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
