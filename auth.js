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

    if (!req.body.Username || !req.body.Password) {
      console.log("Missing username or password in request");
      return res.status(400).json({
        message: "Both username and password are required",
      });
    }

    User.findOne({ Username: req.body.Username })
      .then((user) => {
        if (!user) {
          console.log("No user found with username:", req.body.Username);
          return res.status(401).json({
            message: "Invalid username or password",
          });
        }

        console.log("User found:", user.Username);
        console.log("Stored hashed password:", user.Password);
        console.log("Provided password:", req.body.Password);

        bcrypt.compare(req.body.Password, user.Password, (err, isMatch) => {
          if (err) {
            console.error("bcrypt compare error:", err);
            return res.status(500).json({
              message: "Error comparing passwords",
              error: err.message,
            });
          }

          if (!isMatch) {
            console.log("Password does not match for user:", user.Username);
            return res.status(401).json({
              message: "Invalid username or password",
            });
          }

          console.log("Password matches, generating token for:", user.Username);
          let token = generateJWTToken(user);

          // Remove sensitive information before sending the user object
          const userResponse = {
            _id: user._id,
            Username: user.Username,
            Email: user.Email,
            Birthday: user.Birthday,
            FavoriteMovies: user.FavoriteMovies,
          };

          console.log("Login successful, sending response");
          return res.json({ user: userResponse, token });
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
