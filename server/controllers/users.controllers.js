const User = require('../DB/models/User/user.model')


const createNewUser = async (req, res) => {
  const userBody = req.body;
  try {
    const newUser = new User(userBody);
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });


  } catch (err) {
    res.status(400).send(err);
  }
}


module.exports = { createNewUser };