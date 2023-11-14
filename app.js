"use strict";

/** Express app for sharebnb */


const express = require("express");
const cors = require("cors");
// const { authenticateJWT } = require("./middleware/auth");
// const nunjucks = require('nunjucks');

const { NotFoundError } = require("./expressError");
const app = new express();

// nunjucks.configure("templates", {
//   autoescape: true,
//   express: app,
// });

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded());

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
// app.use(authenticateJWT);

/** routes */

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