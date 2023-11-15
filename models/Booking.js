"use strict";


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Listing = require('./Listing');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
  ,
  guest_id: {
    type: DataTypes.STRING(50),
    references: { model: User, key: "username" },
    allowNull: false
  },
  listing_id: {
    type: DataTypes.INTEGER,
    references: { model: Listing, key: "id" },
    allowNull: false
  },
  check_in_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  check_out_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_time_booked: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "bookings",
  timestamps: false
});


// sequelize.sync();

module.exports = Booking;
