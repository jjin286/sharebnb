"use strict";

const express = require("express");
const router = new express.Router();
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const Listing = require("../models/Listing");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { ensureLoggedIn } = require("../middleware/auth");


//TODO:doc
router.post("/:id", ensureLoggedIn, async function (req, res, next) {
  const listingId = Number(req.params.id);
  const guestUsername = res.locals.user.username;
  const listing = await Listing.findByPk(listingId);
  const price = listing.price_per_day;

  const { check_in_date, check_out_date } = req.body;

  const booking = await Booking.create({
    check_in_date,
    check_out_date,
    price: price,
    listing_id: listingId,
    guest_id: guestUsername
  });

  return res.status(201).json({ booking });
});

//TODO:doc
router.delete("/:bookingId", ensureLoggedIn, async function (req, res, next) {

  const bookingId = Number(req.params.bookingId);
  const booking = await Booking.findByPk(bookingId);

  if (booking.guest_id !== res.locals.user.username) {
    throw new UnauthorizedError();
  }

  await booking.destroy();

  return res.json({ deleted: "Booking is deleted" });
});

//TODO:get all bookings of a guest user
router.get("/:guestUsername", ensureLoggedIn, async function (req, res, next) {
  const bookings = await Booking.findAll({
    where: { guest_id: req.params.guestUsername }
  });

  if (!bookings) throw new NotFoundError();

  return res.json({ bookings });
});


module.exports = router;
