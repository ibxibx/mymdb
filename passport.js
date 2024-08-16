const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const Models = require('./models.js');
const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
require('dotenv').config();

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      try {
        const user = await Users.findOne({ Username: username });
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        const isValid = await bcrypt.compare(password, user.Password);
        if (!isValid) {
          console.log('incorrect password');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        console.log('finished');
        return callback(null, user);
      } catch (error) {
        console.log(error);
        return callback(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, callback) => {
      try {
        const user = await Users.findById(jwtPayload.id);
        if (!user) {
          console.log('User not found');
          return callback(null, false, { message: 'User not found.' });
        }
        console.log('JWT validated, user found');
        return callback(null, user);
      } catch (error) {
        console.log('Error in JWTStrategy:', error);
        return callback(error);
      }
    }
  )
);

module.exports = passport;