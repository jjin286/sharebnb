"use strict";
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  const authHeader = req.headers?.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^[Bb]earer /, "").trim();

    try {
      res.locals.user = jwt.verify(token, SECRET_KEY);
      console.log("Auth JWT: ",res.locals.user)
    } catch (err) {
      /* ignore invalid tokens (but don't store user!) */
    }
  }
  return next();

}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  if (res.locals.user?.username) return next();
  throw new UnauthorizedError();
}

/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

function ensureHost(req, res, next) {
  if (res.locals.user?.username && res.locals.user?.isHost === true) {
    return next();
  }
  throw new UnauthorizedError();

}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureHost,
};