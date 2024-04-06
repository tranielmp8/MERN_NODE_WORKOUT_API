const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  }
})

//static method called signup() manually create our own method through mongoDB
userSchema.statics.signup = async function(email, password){

  //validation
  if(!email || !password) {
    throw Error('ALL fields must be filled')
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }
  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  // salt - adds an extra layer of security by adding extra random characters before the hashing
  const salt = await bcrypt.genSalt(10) //default value is 10 can add more, but will take longer
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash });

  return user

}

// static login method
userSchema.statics.login = async function (email, password) {

  //validation
  if(!email || !password) {
    throw Error('ALL fields must be filled')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect Email')
  }

  const match = await bcrypt.compare(password, user.password);

  if(!match) {
    throw Error('Incorrect Password')
  }

  return user

}


module.exports = mongoose.model('User', userSchema);