import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavbarSuperhero from "./components/navbar/Navbar";
import "./App.css";

//Context
import UserLoginContext from "./components/contextTeam";

//Boostrap
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const [userLogin, setUserLogin] = useState(true);

  return (
    <Router>
      <NavbarSuperhero />
      <UserLoginContext.Provider value={{ userLogin, setUserLogin }}>
        <div className="App">
          <Switch>
            {userLogin ? (
              <Route path="/">
                <Login />
              </Route>
            ) : (
              <Route path="/">
                <Home />
              </Route>
            )}
          </Switch>
        </div>
      </UserLoginContext.Provider>
    </Router>
  );
}
