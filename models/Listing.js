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
  image: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
  ,
  host_id: {
    type: DataTypes.STRING(50),
    references: { model: User, key: "username" },
    allowNull: false
  }
}, { tableName: "listings" });

//One to many
User.hasMany(Listing, {
  foreignKey: "host_id",
  sourceKey: "username"
});
Listing.belongsTo(User, {
  foreignKey: "host_id"
});

//Many to many
User.belongsToMany(Listing, {
  as: "listing",
  through: "bookings",
  foreignKey: "guest_id",
  sourceKey: "username"
});
Listing.belongsToMany(User, {
  as: "user",
  through: "bookings",
  foreignKey: "listing_id",
  sourceKey: "id"
})

// sequelize.sync();

module.exports = Listing;
