"use strict";

const express = require("express");
const { BadRequestError, NotFoundError } = require("../expressError");
const { Listing } = require("../models");

const router = new express.Router();


router.get("/", async function (req, res, next) {
  const listings = await Listing.findAll();
  return res.json({ listings });
});
