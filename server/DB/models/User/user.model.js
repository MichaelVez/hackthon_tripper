const mongoose = require("mongoose");
const userSchema = require("./user.schema")

const User = mongoose.model('users', userSchema)

module.exports = User;