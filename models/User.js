"use strict";

const { Sequelize, DataTypes, Model } = require('sequelize');
const Booking = require("./Booking");
const sequelize = require('../db');

//TODO:reserch if need to rename table
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
    validate: { isEmail: true },
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
},{
  tableName: "users",
  timestamps: false
});

//One to many
User.hasMany(Booking, {
  foreignKey: "guest_id",
  sourceKey: "username"
});
Booking.belongsTo(User, {
  foreignKey: "guest_id"
});

// sequelize.sync();

module.exports = User;
