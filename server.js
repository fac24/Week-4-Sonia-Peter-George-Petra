/* Express module setup */

const express = require("express");
const server = express();

// Body parser middleware to parse request body
const bodyParser = express.urlencoded({ extended: false });
server.use(bodyParser);

// add static handler to have access to all files inside public
const staticHandler = express.static("public");
server.use(staticHandler);

// allow your server to read cookies from incoming requests. It will parse the cookie into an object, then attach it to the request object for you to use
const cookieParser = require("cookie-parser");
server.use(cookieParser());

// Routes

server.get("/", (request, response) => {
  response.send("Home Page");
});

// assign port to deployed or local port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
