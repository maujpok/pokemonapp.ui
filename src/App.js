import React from "react";
import { Route, Switch } from "react-router";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import './App.css';



export default function App() {

  return (
    <div className='App'>
      <NavBar/>
      <Switch>
        <Route exact path='/'><Landing/></Route>
        <Route path='/home'><Home/></Route>
        <Route exact path='/create'> <Create/></Route>
        <Route path='/:id' render={({match}) => <Details id={match.params.id}/>}/>
      </Switch>
    </div>
  )
};
