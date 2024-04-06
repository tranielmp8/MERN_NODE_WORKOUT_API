const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

// create our own token function
const createToken = (_id) => {
  // 3 arguements also if I would have just put id in params would need to
  //changed first argument to this {_id: id}
  return jwt.sign({ _id }, process.env.SUPER_SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password) // <-- new login method in userModel 

    // create a token
    const token = createToken(user._id)
   
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password) // <-- new signup method in userModel

    // create a token
    const token = createToken(user._id)
    
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {signupUser, loginUser}