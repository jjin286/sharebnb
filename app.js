"use strict";

/** Express app for sharebnb */


const express = require("express");
const cors = require("cors");
const sequelize = require('./db');

const listingRoutes = require('./routes/listings');
const authRoutes = require("./routes/auth");
const bookingRoutes = require('./routes/bookings');
const userRoutes = require("./routes/users");

const { authenticateJWT } = require("./middleware/auth");

const { NotFoundError } = require("./expressError");
const app = new express();

// User.sync();
// Listing.sync();
// Booking.sync();

const syncModels = async () => {

  await sequelize.sync({ force: false });
};
syncModels();

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded());

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
app.use(authenticateJWT);

/** routes */

app.use("/listings", listingRoutes);
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/users");
// const messageRoutes = require("./routes/messages");

// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/messages", messageRoutes);

// app.use("/", function(req,res) {
//   return res.render("login.html");
// })


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});




module.exports = app;
