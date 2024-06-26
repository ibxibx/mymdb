const express = require("express");
const app = express();
const port = 8080;

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Define a route to serve the documentation.html file
// Accessible via localhost:8080/documentation.html
// This route is now handled by express.static middleware

app.get("/", (req, res) => {
  res.send(
    "Welcome to my Top Movies List / API. The art of film is relatively new, but it had given both the creators and spectators countless possibilities while creating those masterpieces, as well as fantastic experiences for the ones enjoying watching them. My Top Movies List includes just the movies I could recall right away. I hope you'd get a taste to watch some of them and enjoy them as much as I did."
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
