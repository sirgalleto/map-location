const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const location = require("./routes/location");

const port = 3000;

app.use(express.json());
app.use("/location", location);

server.listen(port, () => {
  console.info(`App listennin on port ${port}`);
});
