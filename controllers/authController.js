const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//REGISTRATION
module.exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashed,
    });
    // delete user.password;
    return res.json({ msg: "successfully registered", status: true });
  } catch (ex) {
    res.send({ msg: "some error has occured", status: false });
  }
};
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.send({ msg: "wrong password", status: false });
      } else
        res.send({ msg: "logged in successfully", status: true, token: user });
    } else {
      res.send({ msg: "user not found", status: false });
    }
  } catch (err) {
    res.send({ msg: "some error has occured", status: false });
  }
};
