const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const Models = require('./models.js');

let Users = Models.User,
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

require('dotenv').config();

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
      .then((user) => {
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        console.log('finished');
        return callback(null, user);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
      })
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Use environment variable here
    },
    async (jwtPayload, callback) => {
      try {
        // Find user by ID in JWT payload
        const user = await Users.findById(jwtPayload._id);
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