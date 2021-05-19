import React, { Component } from "react";
import { Link } from "react-router-dom";
import bankIcon from "../assets/download.png";

export default class Nav extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    localStorage.clear("token");
    this.props.setUser({
      user: null,
      isLoggedIn: false,
    });
  };
  render() {
    let buttons;
    if (this.props.isLoggedIn) {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/"} onClick={this.handleLogout} className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              <i class="fa fa-sign-in"></i>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              <i class="fa fa-user-secret"></i>
              Sign up
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <i class="fa fa-home"></i>
            Banking Management System
          </Link>
          <div className="collapse navbar-collapse">{buttons}</div>
        </div>
      </nav>
    );
  }
}
