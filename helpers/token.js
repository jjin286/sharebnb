"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


function createToken(user) {
  let payload = {
    username: user.username,
    isHost: user.is_host || false,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports =  createToken;
