"use strict";

/** Express app for sharebnb */


const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Booking = require("./models/Booking");
const db  = require('./db');
// const aws = require("aws-sdk")

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  },
  region: BUCKET_REGION
})

// aws.config.update({
//   accessKeyId: ACCESS_KEY,
//   secretAccessKey: SECRET_ACCESS_KEY,
//   region: BUCKET_REGION,
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const { NotFoundError } = require("./expressError");
const app = new express();

User.sync();
Listing.sync();
Booking.sync();

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded());

// allow connections to all routes from any browser
app.use(cors());


app.post('/upload', upload.single("image"), function(req, res, next) {
  if (req.file) {
    res.send("Single file uploaded successfully");
  } else {
    res.status(400).send("Please upload a valid image");
  }
})

// app.post('/upload', upload.single('profile-file'), function (req, res, next) {
//   // req.file is the `profile-file` file
//   // req.body will hold the text fields, if there were any
//   console.log(JSON.stringify(req.file))
//   var response = '<a href="/">Home</a><br>'
//   response += "Files uploaded successfully.<br>"
//   response += `<img src="${req.file.path}" /><br>`
//   return res.send(response)
// })

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
