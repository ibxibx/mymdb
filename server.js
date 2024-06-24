const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "log.txt");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const visitedUrl = parsedUrl.pathname;
  const timestamp = new Date().toISOString();

  // Log the visited URL and timestamp to log.txt
  const logEntry = `${timestamp}: ${visitedUrl}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });

  // Serve the requested file based on the URL
  if (visitedUrl.includes("documentation")) {
    serveFile("documentation.html", "text/html", response);
  } else {
    serveFile("index.html", "text/html", response);
  }
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});

function serveFile(fileName, contentType, response) {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 - Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(data);
    }
  });
}
