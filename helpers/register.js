const User = require("../models/User");
const bcrypt = require("bcrypt");
const {UnauthorizedError, BadRequestError} = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function register(userInfo){
  const {username, password} = userInfo;

  const duplicateCheck = await User.findByPk(username);

  if(duplicateCheck){
    throw new BadRequestError(`Duplicate username: ${username}`);
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  const user = await User.create({...userInfo, password : hashedPassword});

  return user;
}

module.exports = register;