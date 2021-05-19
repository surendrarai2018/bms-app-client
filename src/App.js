import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import Home from "./component/home.component";
import Nav from "./component/nav.component";
import Login from "./component/login.component";
import Register from "./component/register.component";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { Forgot } from "./component/forgot.component";
import { Reset } from "./component/reset.component";
import axios from "axios";
import bankImage from "./assets/co-op-bank.jpg";
import Footer from "./component/footer.component";
import axiosInstance from "./axios.global";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: null,
    isLoggedIn: false,
  };
  componentDidMount = () => {
    axiosInstance.get(`user`).then(
      (response) => {
        this.setUser({
          user: response.data,
          isLoggedIn: true,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  setUser = ({ user, isLoggedIn }) => {
    this.setState({
      user,
      isLoggedIn,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            setUser={this.setUser}
          />
          <div class="jumbotron">
            <div className="jumb-img">
              <img src={bankImage} alt="banner" />
            </div>
          </div>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <Home user={this.state.user} />}
                />
                {!this.state.isLoggedIn && (
                  <Switch>
                    <Route
                      exact
                      path="/login"
                      component={() => <Login setUser={this.setUser} />}
                    />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/forgot" component={Forgot} />
                    <Route exact path="/reset/:id" component={Reset} />
                  </Switch>
                )}
                {this.state.isLoggedIn && (
                  <Switch>
                    <Route
                      exact
                      path="/dashboard"
                      component={() => <p>I am dash</p>}
                    />
                  </Switch>
                )}
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
