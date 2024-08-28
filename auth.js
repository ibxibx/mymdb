const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("./models"); // Adjust this import based on your project structure
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
    console.log("Login attempt received:", req.body);

    // First, find the user manually
    User.findOne({ Username: req.body.Username })
      .then((user) => {
        if (!user) {
          console.log("User not found:", req.body.Username);
          return res.status(401).json({
            message: "Invalid username or password",
          });
        }

        // Manually compare passwords
        bcrypt.compare(req.body.Password, user.Password, (err, isMatch) => {
          if (err) {
            console.error("Password comparison error:", err);
            return res.status(500).json({
              message: "Error during authentication",
            });
          }

          if (!isMatch) {
            console.log("Password mismatch for user:", req.body.Username);
            return res.status(401).json({
              message: "Invalid username or password",
            });
          }

          // If we get here, username and password are correct
          console.log("Authentication successful for:", user.Username);
          let token = generateJWTToken(user);
          return res.json({ user, token });
        });
      })
      .catch((error) => {
        console.error("Database error during login:", error);
        return res.status(500).json({
          message: "Error during authentication",
          error: error.message,
        });
      });
  });
};
