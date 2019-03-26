const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const location = require("./routes/location");

app.use(express.json());
app.use("/location", location);

module.exports = server