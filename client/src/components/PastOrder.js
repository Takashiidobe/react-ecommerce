import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as routes from "../constants/routes";

import withAuthorization from "./withAuthorization";

class PastOrderPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      orders: []
    };
  }
  componentDidMount() {
    //we want to grab the user's past orders at this point
    let user = firebase.auth().currentUser;
    let username, email;
    if (user != null) {
      username = user.displayName;
      email = user.email;
    }
    this.setState({
      email,
      username
    });
    //get the user's orders
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        //let the browser keep the idtoken
        localStorage.setItem("idToken", idToken);
        axios
          .get(`/api/items/${email}`, {
            headers: {
              authorization: idToken || localStorage.getItem("idToken")
            }
          })
          .then(res =>
            this.setState({
              order: res.data
            })
          )
          .catch(err => console.log(err));
      });
  }

  render() {
    return (
      <div>
        {this.state.orders}
        <p>Past orders page</p>
      </div>
    );
  }
}

//sets the auth condition as the authuser
const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(PastOrderPage);
