//this sets up our api endpoints that our application can access
//requires the express router middleware
const express = require("express");
const router = express.Router();

//allows usage of our verifyToken middleware function
const verifyToken = require("../../helpers/verifyToken");

//when posting to the api using axios we need to send a header with a valid idtoken
//we will be verifying this in order to tell if the user is properly authenticated

// required for the back-end firebase SDK
const admin = require("firebase-admin");
const serviceAccount = require("../../config/firebaseKeys.json");

//the json file and database url required for the firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://react-authentication-27354.firebaseio.com`
});

const Order = require("../../models/Order");

// @route   GET api/order/:email
// @desc    Gets the orders associated to an email
// @access  Private
router.get("/:email", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        Order.find({
          email: req.params.email
        })
          .sort({ _id: -1 })
          .then(orders => res.json(orders))
          .catch(() => res.status(404).json({ success: false }));
      }
    })
    .catch(err => {
      //handle this error somehow
      res.send(err);
    });
});

// @route   POST api/order/:email
// @desc    Create An Order
// @access  Private
router.post("/:email", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const newOrder = new Order({
          email: req.body.email,
          orderDate: req.body.orderDate,
          total: req.body.total
        });
        newOrder
          .save()
          .then(order => res.json(order))
          .catch(() => res.status(404).json({ success: false }));
      }
    })
    .catch(err => {
      //handle this error somehow
      console.log(err);
    });
});

// @route   DELETE api/order/:email
// @desc    Delete All orders belonging to a certain email
// @access Private
router.delete("/:email", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        Order.remove({
          email: req.params.email
        })
          .then(order => order.remove().then(() => res.json({ success: true })))
          .catch(() => res.status(404).json({ success: false }));
      }
    })
    .catch(err => {
      //handle this error somehow
      console.log(err);
    });
});

//export this as the order router
module.exports = router;
