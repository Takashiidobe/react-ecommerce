import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Pages to render in the App component
import Navigation from "./Navigation";
import LandingPage from "./Landing";
import SignUpPage from "./SignUp";
import SignInPage from "./SignIn";
import PasswordForgetPage from "./PasswordForget";
import HomePage from "./Home";
import AccountPage from "./Account";
import CheckoutPage from "./Checkout";
import PastOrderPage from "./PastOrder";

import * as routes from "../constants/routes";

import withAuthentication from "./withAuthentication";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.CHECKOUT} component={() => <CheckoutPage />} />
      <Route
        exact
        path={routes.PAST_ORDER}
        component={() => <PastOrderPage />}
      />
    </div>
  </Router>
);

export default withAuthentication(App);
