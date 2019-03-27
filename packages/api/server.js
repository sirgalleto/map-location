const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
var cors = require("cors");
const location = require("./routes/location");

app.set("io", io);
app.use(express.json());
app.use(cors());
app.use("/location", location);

module.exports = server;
