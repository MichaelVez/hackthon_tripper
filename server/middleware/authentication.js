const jsonwebtoken =  require('jsonwebtoken');
const User = require('../DB/models/User/user.model')

const authentication = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jsonwebtoken.verify(token, 'SecretCode!');
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

    if(!user) throw new Error();
    req.token = token;
    req.user = user;
    next();

  } catch (err) {
    res.status(401).send({error: 'Please Authenticate.'})
  }
}

module.exports = authentication;