const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

http
  .createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname.includes("documentation")) {
      fs.readFile(
        path.join(__dirname, "documentation.html"),
        "utf-8",
        (err, data) => {
          if (err) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("500 - Internal Server Error");
          } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(data);
          }
        }
      );
    } else {
      fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, data) => {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("500 - Internal Server Error");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(data);
        }
      });
    }
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");
