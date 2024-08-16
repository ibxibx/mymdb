const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');
require('dotenv').config();

let generateJWTToken = (user) => {
  return jwt.sign({ id: user._id, username: user.Username }, process.env.JWT_SECRET, {
    subject: user.Username,
    expiresIn: '365d',
    algorithm: 'HS256'
  });
}

module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user);
        return res.json({ user, token });
      });
    })(req, res);
  });
}