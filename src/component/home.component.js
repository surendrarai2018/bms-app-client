import React, { Component } from "react";
export default class Home extends Component {
  render() {
    if (this.props.user) {
      return <h2>Hi {this.props.user}</h2>;
    }
    return <h2>You are not loggedIn</h2>;
  }
}
