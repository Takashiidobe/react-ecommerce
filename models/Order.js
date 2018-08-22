//imports to create our schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema details
const OrderSchema = new Schema({
  //email as first parameter, must be String and provided
  email: {
    type: String,
    required: true
  },
  //default this parameter to the date it was ordered
  orderDate: {
    type: Date,
    default: Date.now()
  },
  //put this as the total amount of the order
  total: {
    type: Number,
    required: true
  }
});

//export the schema as Order
module.exports = Order = mongoose.model("order", OrderSchema);
