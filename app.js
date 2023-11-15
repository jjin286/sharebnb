"use strict";

/** Express app for sharebnb */


const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Booking = require("./models/Booking");
const db = require('./db');
// const aws = require("aws-sdk")

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  },
  region: BUCKET_REGION
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



// aws.config.update({
//   accessKeyId: ACCESS_KEY,
//   secretAccessKey: SECRET_ACCESS_KEY,
//   region: BUCKET_REGION,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.originalname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })

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


app.post('/upload', upload.single("image"), async function (req, res, next) {
  req.file.buffer;

  const params = {
    Bucket: BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };

  const command = new PutObjectCommand(params);
  const result = await s3.send(command);

  //TODO: implement saving image url to database
  console.log(`https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${req.file.originalname}`);

  res.json(result);
});

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
