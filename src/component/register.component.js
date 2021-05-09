import React, { Component } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
export default class Register extends Component {
    state = {};

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
    console.log(data);

    axios.post(`${base_url}/register`, data).then(
      response => {
        console.log(response);
        console.log("success");
      }
    ).catch(
        err => {
            this.setState({
               // message: err.response.data.message
            })
        }
    )
  };

  render() {
    this.state = { formErrors: {} };
    const { genderErr } = this.state.formErrors;

    let error = '';
      if (this.state.message) {
          error = (
              <div className="alert alert-danger" role="alert">
                  {this.state.message}
              </div>
          )
      }

    return (
      <form onSubmit={this.handleSubmit}>
          {error}
        <h3>Registration</h3>

        <div className="form-group">
          <label>userName</label>
          <input
            type="text"
            className="form-control"
            placeholder="User Name"
            onChange={(e) => (this.userName = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Please enter email address"
            onChange={(e) => (this.email = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => (this.password = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => (this.confirmPassword = e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            onChange={this.handleChange}
            className={genderErr ? " showError" : ""}
            value={this.state.gender}
          >
            <option value="select">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="female">Other</option>
          </select>
          {genderErr && (
            <div style={{ color: "red", paddingBottom: 10 }}>{genderErr}</div>
          )}
        </div>

        <button className="btn btn-primary btn-block">Register</button>
      </form>
    );
  }
}
