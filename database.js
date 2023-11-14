const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {},
    logging: false,
  },
);

sequelize.sync();

module.exports = sequelize;
