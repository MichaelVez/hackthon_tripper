const express = require("express");
const {createNewUser, loginUser, logoutUser} = require('../controllers/users.controllers')
const authentication = require('../middleware/authentication')

const usersRouter = express.Router();

// POST
usersRouter.post('/create-user',createNewUser);

usersRouter.post('/login', loginUser)

// //! Need Authentication

usersRouter.post('/logout', authentication, logoutUser)


module.exports = usersRouter;