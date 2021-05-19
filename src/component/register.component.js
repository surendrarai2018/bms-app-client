import React, { Component } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios.global";

export default class Register extends Component {
  state = {};

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    console.log(data);
    axiosInstance
      .post(`register`, data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          toast.success("Customer registeration successfuly");
        }
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  };

  render() {
    this.state = { formErrors: {} };
    const { genderErr } = this.state.formErrors;

    let error = "";
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {error}
        <h3>Customer Registration</h3>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Name<span class="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              onChange={(e) => (this.name = e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label>
              User Name<span class="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              onChange={(e) => (this.username = e.target.value)}
            />
          </div>
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Email Address<span class="required">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Please enter email address"
              onChange={(e) => (this.email = e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label>
              Password<span class="required">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => (this.password = e.target.value)}
            />
          </div>
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Guardian Name<span class="required">*</span>
            </label>
            <input
              type="gaurdianName"
              className="form-control"
              placeholder="Guardian Name"
              onChange={(e) => (this.guardianName = e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label>
              Guardian Type<span class="required">*</span>
            </label>
            <input
              type="gaurdianType"
              className="form-control"
              placeholder="Guardian Type"
              onChange={(e) => (this.guardianType = e.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="inputAddress">
            Address<span class="required">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCountry">
              Country<span class="required">*</span>
            </label>

            <select className="form-control" id="countySel" size="1">
              <option value="" selected="selected">
                -- Select Country --
              </option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="inputState">
              State<span class="required">*</span>
            </label>

            <select className="form-control" id="stateSel" size="1">
              <option value="" selected="selected">
                -- Select State--
              </option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Citizenship<span class="required">*</span>
            </label>
            <input
              type="citizenship"
              className="form-control"
              placeholder="Citizenship"
              onChange={(e) => (this.citizenship = e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="gender">
              Gender<span class="required">*</span>
            </label>
            <select
              name="gender"
              onChange={this.handleChange}
              className={genderErr ? " showError" : ""}
              className="form-control"
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
        </div>

        <div class="form-group ">
          <label class="col-lg-3 control-label">
            Date of Birth<span class="required">*</span>
          </label>
          <input name="dob" type="date" className="form-control" />
        </div>
        <button className="btn btn-primary btn-block">Register</button>
      </form>
    );
  }
}
