const jwt = require("jsonwebtoken");
const passport = require("passport");
require("./passport");
require("dotenv").config();

let generateJWTToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.Username },
    process.env.JWT_SECRET,
    {
      subject: user.Username,
      expiresIn: "365d",
      algorithm: "HS256",
    }
  );
};

module.exports = (router) => {
  router.post("/login", (req, res) => {
    console.log("Login attempt received:", req.body.Username);
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
          message: "Authentication error",
          error: error.message,
        });
      }
      if (!user) {
        console.log(
          "User not found or invalid credentials for:",
          req.body.Username
        );
        return res.status(400).json({
          message: "Invalid username or password",
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          console.error("Login error:", error);
          return res.status(500).json({
            message: "Login error",
            error: error.message,
          });
        }
        let token = generateJWTToken(user);
        console.log("Login successful for:", user.Username);
        return res.json({ user, token });
      });
    })(req, res);
  });
};
