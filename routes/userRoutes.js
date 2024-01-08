const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');
const tokenCheck = require('../controllers/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser)
router.post('/update',tokenCheck,updateUser)

module.exports = router;