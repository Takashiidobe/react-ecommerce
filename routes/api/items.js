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

// uses the Item model
const Item = require("../../models/Item");
// uses our cart model
const Payment = require("../../models/Payment");

//gets items that are connected to your email
//sorts by recent first
router.get("/:email", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        Item.find({
          email: req.params.email
        })
          .sort({ _id: -1 })
          .then(items => res.json(items));
      }
    })
    .catch(err => {
      //handle this error somehow
      res.send(err);
    });
});

// @route   POST api/items
// @desc    Create An Item
// @access private  Public
router.post("/", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const newItem = new Item({
          name: req.body.name,
          price: req.body.price,
          email: req.body.email,
          itemID: req.body.ItemID
        });

        newItem.save().then(item => res.json(item));
      }
    })
    .catch(err => {
      //handle this error somehow
      console.log(err);
    });
});

// @route POST api/items/payment
// @desc post a payment
// @access private Public
router.post("/payment/:email", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const newPayment = new Payment({
          description: req.body.description,
          source: req.body.source,
          currency: req.body.currency,
          amount: req.body.amount
        });
        newPayment.save().then(payment => res.json(payment));
      }
    })
    .catch(err => {
      res.sendStatus(403);
    });
});

// @route POST api/:email/cart
// @desc Post a new cart to this route
// @access private Public
router.post("/:email/cart", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const newCart = new Cart({
          itemName: req.body.itemName,
          price: req.body.price,
          email: req.params.email,
          totalPrice: req.body.totalPrice
        });

        newCart.save().then(cart => res.json(cart));
      }
    })
    .catch(err => {
      //handle this error somehow
      console.log(err);
    });
});

// @route   DELETE api/items/:email
// @desc    Delete All items belonging to a certain email
// @access private  Public
router.delete("/:email", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        Item.remove({
          email: req.params.email
        })
          .then(item => item.remove().then(() => res.json({ success: true })))
          .catch(err => res.status(404).json({ success: false }));
      }
    })
    .catch(err => {
      //handle this error somehow
      console.log(err);
    });
});

// @route DELETE api/items/email/id
// @desc find a specific item belonging to a certain email and delete it
// @access private Public
router.delete("/:email/:itemID", verifyToken, (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.token)
    .then((decodedToken, err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        Item.findOne({
          email: req.params.email,
          itemID: req.params.itemID
        })
          .then(item => item.remove().then(() => res.json({ success: true })))
          .catch(err => res.status(404).json({ success: false }));
      }
    })
    .catch(err => {
      //handle this error somehow
      console.log(err);
    });
});

//export this as router
module.exports = router;
