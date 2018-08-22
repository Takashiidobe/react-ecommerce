//imports to create our schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema details
const StoreItemSchema = new Schema({
  //name is the first parameter
  //it accepts a String as input and it must be provided
  name: {
    type: String,
    required: true
  },
  //price as second parameter
  //accepts only a Number and must be provided
  price: {
    type: Number,
    required: true
  },
  itemID: {
    type: Number,
    Required: true
  }
});

//export the schema as Item
module.exports = StoreItem = mongoose.model("storeItem", StoreItemSchema);
