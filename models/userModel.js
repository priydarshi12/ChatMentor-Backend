const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");


//model

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
 verifytoken:{
  type:String,
 }
});



const User = mongoose.model("User", userSchema);

module.exports = User;
