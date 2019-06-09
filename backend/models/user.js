// const config = require('config');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //     minlength: 5,
  //     maxlength: 50
  //   },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  }
});

// userSchema.methods.generateAuthToken = function() {
//   //Method as a part of object don't call arrow function
//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get('jwtPrivateKey')
//   );
//   return token;
// };

userSchema.plugin(uniqueValidator);

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
  const Schema = {
    // name: Joi.string()
    //   .min(5)
    //   .max(50)
    //   .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(user, Schema);
}

exports.User = User;
exports.validateUser = validateUser;
