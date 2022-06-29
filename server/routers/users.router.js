const express = require("express");
const {createNewUser} = require('../controllers/users.controllers')

const usersRouter = express.Router();

// POST
usersRouter.post('/create-user',createNewUser);

// usersRouter.post('/login', loginUser)

// //! Need Authentication

// usersRouter.post('/logout', authentication, logoutUser)


module.exports = usersRouter;