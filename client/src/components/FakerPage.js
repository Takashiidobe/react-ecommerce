import React, { Component } from "react";
import "./fakerPage.css";
import Items from "./Items";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// We want to add the cost and the item name to the state

class FakerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartPrice: 0.0,
      cart: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "idToken"
    );
  }

  render() {
    let user = firebase.auth().currentUser;
    let email;
    if (user != null) {
      email = user.email;
    }
    return (
      <ul>
        {Items.map((items, index) => (
          <li key={index}>
            <div className="card">
              <div className="productName">
                Item:{" "}
                {/* Slice the first and last character to remove the quote marks */}
                {JSON.stringify(items.name).slice(1, -1)}
              </div>
              <div className="costPrice">
                {/* Render the item as its price in dollars */}
                Price: {`$${JSON.stringify(items.price) / 100}`}
              </div>
              <button
                onClick={() => {
                  axios
                    .post("/api/items", {
                      headers: {
                        authorization: localStorage.getItem("idToken")
                      },
                      ItemID: items.ItemID,
                      name: items.name,
                      price: items.price,
                      email: email
                    })
                    .then(res => {
                      console.log(res);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }}
              >
                Add to cart
              </button>
              <br />
              <br />
            </div>
            <br />
          </li>
        ))}
      </ul>
    );
  }
}

export default FakerPage;
