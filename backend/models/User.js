const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'Email must be a valid email address']

    },
    password: {
      type: String,
       required: [true, 'Password is required']
    },
    token: {
        type: String,
    },
    role:{
        type: String, //[USER,ADMIN,MANAGER]
        enum: Object.values(userRoles),
        default: userRoles.USER
    }
  },-
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
