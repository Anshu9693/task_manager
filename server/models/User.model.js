const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id },process.env.JWT_SECRET,{ expiresIn: "24h" } // Set token to expire in 24 hours
  );
  return token;
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel;



