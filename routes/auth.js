const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
const authenticate = require("../helpers/authenticate");
const createToken = require("../helpers/token");
const register = require("../helpers/register");

router.post("/login", async function (req, res, next) {
  //TODO: Add json validation if time

  const { username, password } = req.body;
  const user = await authenticate(username, password);
  const token = createToken(user);

  return res.json({ token });
});

router.post("/register", async function (req, res, next) {
  const newUser = await register(req.body);
  const token = createToken(newUser);
  return res.status(201).json({ token });
});

module.exports = router;