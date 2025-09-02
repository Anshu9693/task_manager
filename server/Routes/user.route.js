const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/User.controller');
const { authUser } = require('../middleware/auth');
const UserRouter = express.Router();

//ragister route 
UserRouter.post('/register', registerUser);
// login route
UserRouter.post('/login', loginUser);


module.exports = UserRouter;