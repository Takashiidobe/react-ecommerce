import React from "react";
import axios from "axios";
import ReactStripeCheckout from "react-stripe-checkout";
import * as routes from "../constants/routes";
import { Redirect, WithRouter } from "react-router-dom";

import stripePublishable from "../config/stripeKeys";

const currency = "USD";

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
  alert("Payment succeeded");
  //grab the email and post with it
  // axios.post("/payment/");
};

const errorPayment = data => {
  alert("Payment Error");
};

const onToken = (amount, description) => token =>
  axios
    .post(`/api/items/payment/`, {
      description,
      source: token.id,
      currency: currency,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const StripeCheckout = ({ name, description, amount }) => (
  <ReactStripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={currency}
    stripeKey={stripePublishable}
  />
);

export default StripeCheckout;
