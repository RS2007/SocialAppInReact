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
import useFetch from "./useFetch";
function App() {
  const peopleFetch = useFetch("http://localhost:1234/user");
  const peopleList=peopleFetch.data;
  const peopleLoading=peopleFetch.loading;
  const peopleError=peopleFetch.error;
  const peopleObj={peopleList,peopleLoading,peopleError};
  const commentFetch=useFetch("http://localhost:1234/comment");
  const commentListAll=commentFetch.data;
  const commentLoading=commentFetch.loading;
  const commentError=commentFetch.error;
  const commentObj={commentListAll,commentLoading,commentError};
  return (
    <Router>
      <ChakraProvider>
        <Navbar />
        <Switch>
          <Route exact path="/home">
            <Posting />
            <Posts peopleObj={peopleObj} commentObj={commentObj}/>
          </Route>
          <Route path="/upload">
            <PhotoUpload />
          </Route>
          <Route path="/friends">
            <FriendList peopleObj={peopleObj}/>
          </Route>
          <Route path="/post/:id">
            <CommentList peopleObj={peopleObj} commentObj={commentObj}/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/search">
            <Search peopleObj={peopleObj} />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
