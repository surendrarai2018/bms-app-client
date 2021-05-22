import React, { Component } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios.global";

export default class Register extends Component {
  state = {
    input: {
      name: {
        value: "",
        error: "",
        valid: false,
        validations: "required,alphabets"
      },
      phone: {
        value: "",
        error: "",
        valid: false,
        validations: "required,phone"
      },
      email: {
        value: "",
        error: "",
        valid: false,
        validations: "required,email"
      },
    },
    errors: {},
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateChange = this.validateChange.bind(this);
  }

  validateChange = (name, value) => {
    // let input = this.state.input;
    let message = '';
    let isValid = false;
    const oldState = { ...this.state };
    const input = oldState.input[name];
    
    const validationsArray = input.validations.split(",");
    if (validationsArray.length === 0) return true;
    validationsArray.forEach((element) => {
      console.log(element, value.trim().length, new RegExp('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i').test(value))
      if (element === 'required' && value.trim().length === 0  ) {
        message = 'Customer name is required'
        return isValid = false;
      } else if (element === 'alphabets' && !new RegExp('[a-zA-Z]+').test(value)) {
        message = 'Please enter valid name.'
        return isValid = false;
      } else if(element === 'phone' && (value.length < 10 || value.length > 10) && !new RegExp('/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/').test(value)){
        isValid = false;
        message = "Phone number is not valid.";
        return isValid = false;
      } else if(element === 'email' && !new RegExp('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i').test(value)){
        isValid = false;
        message = "Email is invalid.";
        return isValid = false;
      } else {
        message = ''
        isValid = true;
      }
    });

    console.log(isValid)
    return {
      isValid,
      message
    };
  };

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    // let input = this.state.input;
    // input[event.target.name] = event.target.value;
    const oldState = { ...this.state };
    const { isValid, message } = this.validateChange(event.target.name, event.target.value);
    oldState.input[event.target.name]["value"] = event.target.value;
    oldState.input[event.target.name]["valid"] = isValid;
    oldState.input[event.target.name]["error"] = message;
    this.setState({
      ...this.state,
      oldState,
    });
  }

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
    // const { genderErr } = this.state.formErrors;

    let error = "";
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    }
    console.log(this.state);
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
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={this.state.input["name"].value}
              id="name"
              onChange={this.handleChange}
            />
            <div className="text-danger">{this.state.input["name"].error}</div>
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
              id="email"
              value={this.state.input["email"].value}
              onChange={this.handleChange}
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
              className="form-control"
              value={this.state.gender}
            >
              <option value="select">--Select--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="female">Other</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Date of Birth<span class="required">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="dob"
              placeholder="Citizenship"
              onChange={(e) => (this.dob = e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="maritalStatus">
              Marital Status<span class="required">*</span>
            </label>
            <select
              name="marital_status"
              id="marital_status"
              className="form-control"
            >
              <option value="">-Select Marital Status-</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Contact no<span class="required">*</span>
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              placeholder="Enter Phone Number"
              className="form-control"
              value={this.state.input["phone"].value}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group col-md-6">
            <label>
              Registration Date<span class="required">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Registration Date"
              onChange={(e) => (this.guardianType = e.target.value)}
            />
          </div>
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Account Type<span class="required">*</span>
            </label>
            <select id="type" className="form-control" name="type">
              <option value="savings">Savings</option>
              <option value="checking">Salary</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label>
              Branch Name<span class="required">*</span>
            </label>
            <select select id="type" className="form-control" name="type">
              <option value="" disabled="disabled" selected="selected">
                Select Branch
              </option>
              <option value="A B ROAD INDORE">A B ROAD INDORE</option>
              <option value="AIRPORT ROAD INDORE">AIRPORT ROAD INDORE</option>
              <option value="CHAWANI INDORE">CHAWANI INDORE</option>
              <option value="GEETA BHAVAN">GEETA BHAVAN</option>
              <option value="INDORE">INDORE</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div className="form-group col-md-6">
            <label>
              Initial Deposit Amount<span class="required">*</span>
            </label>
            <input
              type="tel"
              id="initialDepositAmount"
              placeholder="Initial Deposit Amount"
              name="depositeAmount"
              className="form-control"
            />
          </div>

          <div className="form-group col-md-6">
            <label>
              Identification Proof Type<span class="required">*</span>
            </label>
            <select id="type" className="form-control" name="type">
              <option value="savings">Adharcard</option>
              <option value="checking">Pancard</option>
              <option value="checking">Passport</option>
            </select>
          </div>
        </div>

        <div class="form-row">
        <div className="form-group col-md-6">
            <label>
            Pancard Number<span class="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter PAN and press enter"
              onChange={(e) => (this.username = e.target.value)}
            />
          </div> 
          </div>

        <button className="btn btn-primary btn-block">Register</button>
      </form>
    );
  }
}
