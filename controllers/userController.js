const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {ERROR_MESSAGES,JWT_SECRET_KEY,SUCCESS_MESSAGES,STATUS_CODES,TOKEN_EXPIRATION} = require('../constants')

const registerUser = async (req, res) => {
  try {
    const { username, password, email, fullName,dateOfBirth,latitude,longitude } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({email:email})
    if (existingUser) {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.USERNAME_EXISTS });
    }
    if(existingEmail){
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:ERROR_MESSAGES.USER_EMAIL_EXISTS});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword,email:email,fullName:fullName,dateOfBirth:dateOfBirth,latitude:latitude,longitude:longitude});
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    newUser.token = token
    await newUser.save();
    res.status(STATUS_CODES.OK).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const loginUser = async (req, res) => {
  try {

    const { username, password,latitude,longitude } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });

    res.status(200).json({ token, user: user });

  } catch (error) {
    console.error(error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateUser = async (req, res) => {
    try {

      const { dateOfBirth, latitude, longitude } = req.body;
      const userId = req.userId; 

      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).json({ message:ERROR_MESSAGES.USER_NOT_FOUND });
      }
  
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (latitude) user.latitude = latitude;
      if (longitude) user.longitude = longitude;
  
      await user.save();
  
      res.status(STATUS_CODES.OK).json({ message: SUCCESS_MESSAGES.USER_UPDATED });
    } catch (error) {
      console.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message:ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
  

module.exports = { registerUser,loginUser,updateUser };