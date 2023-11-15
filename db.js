"use strict";

/** Database connection for ShareBnB. */
const { getDatabaseUri } = require('./config');
require("dotenv").config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(getDatabaseUri());


async function testDb(){try {

  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}

testDb();

module.exports = sequelize;

// const { Client } = require("pg");
// const { DB_URI } = require("./config");

// const db = new Client(DB_URI);

// db.connect();


// module.exports = db;
