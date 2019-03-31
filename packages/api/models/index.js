const Sequelize = require('sequelize');
const config = require('../config/database.json');

const env = process.env.NODE_ENV || 'development';
const databaseConfig = config[env];

const sequelize = new Sequelize(databaseConfig);

module.exports = {
  Location: sequelize.import('./location.js'),
};
