const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;

// Use Morgan Middleware to log requests
app.use(morgan("dev"));

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Require the index.js file
const movieApp = require("./index");

// Mount the movieApp for the /movies endpoint
app.use("/movies", movieApp);

// Define a route for the homepage
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My MDB</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            color: #333;
          }
          p {
            line-height: 1.6;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to My-Movie-DataBase</h1>
          <p>The art of film is relatively new, but it has given both the creators and spectators countless possibilities while creating those masterpieces, as well as fantastic experiences for the ones enjoying watching them.</p>
          <p>My Top Movies List includes just the movies I could recall right away. I hope you'd get a chance to watch some of them and enjoy them as much as I did.</p>
        </div>
      </body>
    </html>
  `);
});

// Route that deliberately throws an error to test the error-handling middleware
app.get("/error", (req, res, next) => {
  const err = new Error("This is a deliberate error.");
  next(err); // Pass the error to the error-handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error to the terminal
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
