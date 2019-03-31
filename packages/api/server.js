const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const location = require('./routes/location');
const { LOCATIONS_CHANNEL_NAME } = require('./constants');

app.set('locationsIo', io.of(LOCATIONS_CHANNEL_NAME));
app.use(express.json());
app.use(cors());
app.use('/location', location);

module.exports = server;
