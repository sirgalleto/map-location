const express = require("express");
const app = express();
const location = require('./routes/location')

const port = 3000

app.use('/location', location)

app.listen(port, () => {
  console.info(`App listennin on port ${port}`);
});