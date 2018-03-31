const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  if (!req.body.photo) req.body.photo = 'https://bulma.io/images/placeholders/128x128.png';

  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: 'We\'ve made an account for you! Log in to make a date.',
        token
      });
    })
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Sorry! Your email or password was unrecognised, try again.' });
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `Hiya ${user.username}!`,
        token
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
