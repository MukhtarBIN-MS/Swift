import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import spark from "./Images/spark.png";
import "./index.css";
import Profile from "./components/Profile/Profile";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { AuthContext } from "./context/AuthContext";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const App = () => {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 1000);
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? (
            <Home />
          ) : splash ? (
            <div className="logoContainer">
              <img className="logoImage" src={spark} />
              <h1>Swift</h1>
            </div>
          ) : (
            <AppContainer>
              <AccountBox />
            </AppContainer>
          )}
        </Route>
        <Route  path="/login">
          {user ? (
            <Redirect to="/" />
          ) : (
            <AppContainer>
              <AccountBox />
            </AppContainer>
          )}
        </Route>
        <Route path="/profile/:username" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
