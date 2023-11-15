"use strict";

const express = require("express");
const { BadRequestError, NotFoundError } = require("../expressError");
const Listing = require("../models/Listing");
const User = require("../models/User");
const Booking = require("../models/Booking");

// ***************************************************************** S3 AWS
const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  },
  region: BUCKET_REGION
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//******************************************************************* */

const router = new express.Router();

/**TODO: */
router.get("/", async function (req, res, next) {
  const listings = await Listing.findAll({ include: User });

  //Use if host should be included in listing
  // const listings = await Listing.findAll({include: User});

  return res.json({ listings });
});

/**TODO: */
router.get("/:id", async function (req, res, next) {
  const params = req.params.id;

  const listing = await Listing.findOne({
    where: {
      id: Number(params)
    }
  });

  return res.json({ listing });
});

router.post("/add", upload.single("image"), async function (req, res, next) {
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

  const { title,
    description,
    address,
    city,
    state,
    zipcode,
    price_per_day,
    host_id } = req.body;

  console.log('Body', req.body);

  const listing = await Listing.create({
    title,
    description,
    address,
    city,
    state,
    zipcode,
    price_per_day,
    host_id,
    image: `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${req.file.originalname}`
  });

  res.status(201).json({ listing });
});

//TODO: doc
router.patch("/:id", async function (req, res, next) {

  const listing = await Listing.findByPk(req.params.id);

  await listing.update(req.body);
  await listing.save();

  return res.json({ listing });
  //TODO: could add update image
});


//TODO:doc
router.delete("/:id", async function (req, res, next) {
  const listing = await Listing.findByPk(req.params.id);
  await Booking.destroy({ where: { listing_id: req.params.id } });

  await listing.destroy();

  return res.json({ deleted: `${req.params.id} is deleted!` });
});

//TODO:error handling

module.exports = router;
