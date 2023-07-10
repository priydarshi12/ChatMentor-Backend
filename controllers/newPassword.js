const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const keysecret = process.env.JWT_ACCESS_SECRET;

module.exports.newPassword = async (req, res) => {
  const { id, token, password } = req.body;

  try {
    const User = await user.findOne({ _id: id, verifytoken: token });

    const veriftToken = jwt.verify(token, `${keysecret}`);

    if (User && veriftToken._id) {
      try {
        const newPass = await bcrypt.hash(password, 10);
        const setNewUserPass = await user.findByIdAndUpdate(
          { _id: id },
          { password: newPass }
        );
        setNewUserPass.save();
        res.send({
          msg: "Password has been successfully updated",
          status: true,
        });
      } catch (err) {
        res.send({ msg: "Some unexpected error has occured please trt again" });
      }
    } else {
      res.send({ msg: "User not exist", status: false });
    }
  } catch (err) {
    res.send({
      msg: "You are not authenticated,Please try again",
      status: false,
    });

  }
};
module.exports.pValidate = async (req, res) => {
  const { id, token } = req.body;
  try {
    const User = await user.findOne({ _id: id, verifytoken: token });
    const veriftToken = jwt.verify(token, `${keysecret}`);
    if (User && veriftToken._id) {
      res.send({ msg: "Please enter your New Password", status: true });
    } else {
      res.send({ msg: "User not exist", status: false });
    }
  } catch (err) {
    res.send({
     
      msg: "You are not authenticated,Please try again",
      status: false,
    });

  }
};
