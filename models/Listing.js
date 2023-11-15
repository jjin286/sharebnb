"use strict";


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Listing = sequelize.define('Listing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    defaultValue: ''
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  zipcode: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  price_per_day: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  host_id: {
    type: DataTypes.STRING(50),
    references: { model: User, key: "username" },
    allowNull: false
  }
}, { tableName: "listings" });

sequelize.sync();

module.exports = Listing;
