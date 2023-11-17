"use strict";

const express = require("express");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const Listing = require("../models/Listing");
const User = require("../models/User");
const Booking = require("../models/Booking");
const {ensureLoggedIn, ensureHost} = require("../middleware/auth");

const router = new express.Router();

/**TODO: doc */
router.get("/:username", ensureLoggedIn, async function (req, res, next) {
  const username = req.params.username;

  // TODO: make into middle ware
  if(username !== res.locals.user.username){
    throw new UnauthorizedError();
  }

  // const user = await User.findByPk(username);
  const user = await User.findByPk(username, {
    include: {
      model: Booking,
      include:{
        model: Listing
      }
    }
  });

  if(!user){
    throw new NotFoundError();
  }
// FIXME: Do not return password
  return res.json({ user });
});


router.patch("/:username", ensureLoggedIn, async function(req, res, next){
  const username = req.params.username;

  if(username !== res.locals.user.username){
    throw new UnauthorizedError();
  }

  const user = await User.findByPk(username);

  if(!user){
    throw new NotFoundError();
  }

  await user.update(req.body);
  await user.save();
// FIXME: Do not return password
  return res.json({ user });
})

/**TODO: */
router.delete("/:username", ensureLoggedIn, async function(req, res, next){
  const username = req.params.username;

  if(username !== res.locals.user.username){
    throw new UnauthorizedError();
  }

  const user = await User.findByPk(username);

  if(!user){
    throw new NotFoundError();
  }

  await user.destroy();

  return res.json({ deleted: `${username} was deleted` });
})





module.exports = router;