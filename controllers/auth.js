const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {JWT_SECRET_KEY,ERROR_MESSAGES,STATUS_CODES} = require('../constants')
const tokenCheck = async (req, res, next) => {
  try {
    console.log("Token ---> request recieved ");
    const token = req.header('Token').replace('Bearer ', '');
    console.log("Token ---> ",token);
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log("User ID ---> ",decoded.userId);
    const user  = await User.findById(decoded.userId);
    // const user = await User.findOne({ _id: decoded.userId, token });

    if (!user) {
      console.log("Throwing Error user not found -->",user);
      throw new Error();
    }

    req.userId = user._id;
    req.token = token;
    next();
  } catch (error) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ message: ERROR_MESSAGES.AUTHENTICATION_FAILED });
  }
};

module.exports = tokenCheck;