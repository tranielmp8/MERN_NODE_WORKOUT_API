const express = require('express');

// controller functions
const { signupUser, loginUser} = require('../controllers/userController')

const router = express.Router();

// Login route
router.post('/login', loginUser)

// signup router
router.post('/signup', signupUser)



module.exports = router