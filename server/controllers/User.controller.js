const userModel = require("../models/User.model")
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// user signup

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body)
  const { fname, lname, email, password } = req.body;
  const isuserExist = await userModel.findOne({ email });
  if (isuserExist) {
    return res.status(400).json({ message: "User already exists" });
  }
const hashPassword = await bcrypt.hash(password, 10);
const user = await userModel.create({
    fname:fname,
    lname:lname,
    email,
    password:hashPassword
})
const token = user.generateAuthToken();
res.status(200).json({token,user})
};

//user login 

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 const { email, password } = req.body;
 const user = await userModel.findOne({ email }).select("+password");
 if(!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
const isMatch = await user.comparePassword(password);
if(!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  } 
const token = user.generateAuthToken();
res.cookie("token", token)
res.status(200).json({ token, user });

}  

