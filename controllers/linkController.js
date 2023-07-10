const user = require("../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const keysecret = process.env.JWT_ACCESS_SECRET;
const Email = process.env.USER_EMAIL;
const Password = process.env.EMAIL_PASS;
//email config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    //**************MUST UPDATE*************************** */
    user: Email,
    pass: Password,
  },
});
module.exports.linkController = async (req, res, next) => {
  try {
    
    const User = await user.findOne({ email: req.body.email });
    if (User.email) {
      const token = jwt.sign({ _id: User._id }, `${keysecret}`, {
        expiresIn: "5",
      });

      const setusertoken = await user.findByIdAndUpdate(
        { _id: User._id },
        { verifytoken: token },
        { new: true }
      );

      if (setusertoken) {
        const mailOptions = {
          from: Email,
          to: User.email,
          subject: "Sending Email For Password Reset.",
          // *****MUST UPDATE ***************
          text: `This Link is valid for 5 Minutes http://localhost:3000/new-password/${User._id}/${setusertoken.verifytoken}`,
        };

        try {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.send({ msg: "Please try again", status: false });
            } else {
            }
          });
        } catch (err) {
        }
      }

      res.send({ msg: "Email has been sent", status: true });
    } else {
      res.send({ msg: "User not find.", status: false });
    }
  } catch (err) {
    res.send({ msg: err.message, status: false });
  }
};
