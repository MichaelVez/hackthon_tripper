const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken");
const User = require("../User/user.model");

const userSchema = mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
  
});


userSchema.methods.generateAuthToken = async function () {
  const user = this;
  
  const token = jsonwebtoken.sign({_id: user._id.toString()}, 'SecretCode!');

  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}


async function hashPasswordBeforeSaving(next) {
  const user = this;
  
  if(user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next();
}

userSchema.pre('save', hashPasswordBeforeSaving)

module.exports =  userSchema 