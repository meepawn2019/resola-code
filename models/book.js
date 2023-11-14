const { Sequelize } = require('sequelize');
const sequelize = require('../database');

const Book = sequelize.define(
  'books',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publish_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    isbn: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Book;
