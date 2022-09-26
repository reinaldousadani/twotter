const { omit } = require("lodash");
const UserModel = require("../models/user.model");

async function createUser(username = "", password = "") {
  return UserModel.create({ username, password });
}

async function validateUserPassword(username = "", password = "") {
  const user = await UserModel.findOne({ username });

  if (!user) return false;

  const valid = await user.comparePassword(password);

  if (!valid) return false;

  return omit(user.toJSON(), "password");
}

async function findUser(query) {
  return UserModel.findOne(query).lean();
}

module.exports = {
  createUser,
  validateUserPassword,
  findUser,
};
