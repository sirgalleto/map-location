const express = require('express');
const LocationController = require('../controllers/location');

const app = express();

app.get('/', LocationController.get);
app.get('/:id', LocationController.getById);
app.post('/', LocationController.create);
app.put('/:id', LocationController.update);
app.delete('/:id', LocationController.delete);

module.exports = app;
