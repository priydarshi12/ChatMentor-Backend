const express=require("express");
const {linkController}=require("../controllers/linkController")
const {newPassword}=require("../controllers/newPassword")
const {pValidate}=require("../controllers/newPassword")
const router = express.Router();


router.post("/sendpasswordlink",linkController);
router.post("/newpassword",newPassword);
router.post("/newpassword/validate",pValidate);


module.exports=router