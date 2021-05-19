import axios from "axios";
import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import axiosInstance from "../axios.global";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  constructor(props) {
    super(props);
    console.log(props);
    this.handleFormChange.bind(this);
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.dataset.value]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axiosInstance
      .post(`login`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        this.props.setUser({
          user: response.data.username,
          isLoggedIn: true,
        });
        this.props.history.push("dashboard");
      })
      .catch((err) => {
        this.setState({
          //  message: err.response.data.message
        });
      });
  };
  render() {
    console.log(this.props.loggedIn);
    let error = "";
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    }
    return (
      <div class="container-fluid">
        <div class="row no-gutter">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>

          <div class="col-md-8 col-lg-6">
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-md-9 col-lg-8 mx-auto">
                    <h3 class="login-heading mb-4">Welcome back!</h3>

                    <form onSubmit={this.handleSubmit}>
                      {error}
                      <h3>Login</h3>

                      <div className="form-group">
                        <label>User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.username}
                          placeholder="User Name"
                          data-value="username"
                          onChange={this.handleFormChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          data-value="password"
                          value={this.state.password}
                          onChange={this.handleFormChange}
                        />
                      </div>

                      <button className="btn btn-primary btn-block">
                        Login
                      </button>
                      <p className="forgot-password text-right">
                        <Link to={"/forgot"}>Forgot password?</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
