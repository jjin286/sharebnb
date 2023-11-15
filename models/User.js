"use strict";

const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
    unique: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_host: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

module.exports = User