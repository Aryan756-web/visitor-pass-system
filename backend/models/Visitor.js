
const mongoose = require("mongoose");


const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    required: false
  },
  photo: {
    type: String // we will store image URL or path
  }
}, { timestamps: true });

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
