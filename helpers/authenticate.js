const User = require("../models/User");
const bcrypt = require("bcrypt");
const {UnauthorizedError} = require("../expressError");

async function authenticate(username, password){

  const user = await User.findByPk(username);

  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid === true) {
      delete user.password;
      return user;
    }
  }

  throw new UnauthorizedError("Invalid username/password");
}

module.exports = authenticate;