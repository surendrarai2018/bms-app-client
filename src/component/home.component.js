import React, { Component } from "react";

export default class Home extends Component {
    
  render() {
      if(this.props.user) {
          <h2>Hi {this.props.user.username}</h2>
      }
    return <h2>Join the bank that puts its customers first</h2>;
  }
}
