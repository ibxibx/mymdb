const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Models = require("./models.js");
const passportJWT = require("passport-jwt");

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    async (username, password, callback) => {
      console.log("LocalStrategy executing for username:", username);
      try {
        const user = await Users.findOne({ Username: username });

        if (!user) {
          console.log("User not found:", username);
          return callback(null, false, { message: "Incorrect username." });
        }

        if (!user.validatePassword(password)) {
          console.log("Incorrect password for user:", username);
          return callback(null, false, { message: "Incorrect password." });
        }

        console.log("User authenticated successfully:", username);
        return callback(null, user);
      } catch (error) {
        console.error("Error in LocalStrategy:", error);
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
        if (user) {
          return callback(null, user);
        } else {
          return callback(null, false);
        }
      } catch (error) {
        return callback(error);
      }
    }
  )
);
