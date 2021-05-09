import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import Home from "./component/home.component";
import Nav from "./component/nav.component";
import Login from "./component/login.component";
import Register from "./component/register.component";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Forgot } from "./component/forgot.component";
import { Reset } from "./component/reset.component";
import axios from "axios";
import bankImage from './assets/co-op-bank.jpg';
import base_url from "./api/bootapi";

export default class App extends Component {
  state = {};
  componentDidMount() {
    axios.post(`${base_url}/user`).then(
        res => {
            this.setUser(res.data);
        },
        err => {
            console.log(err)
        }
    )
   };

   setUser = user => {
    this.setState({
      user: user
  });
   };

  render() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav user={this.state.user} setUser={this.setUser}/>
        <div class="jumbotron">
          <div className="jumb-img">
          <img  src={bankImage} alt="banner"/>
          </div>
        </div>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={() => <Home user={this.state.user}/>} />
              <Route exact path="/login" component={() => <Login setUser={this.setUser}/>} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/reset/:id" component={Reset} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
  }
}

