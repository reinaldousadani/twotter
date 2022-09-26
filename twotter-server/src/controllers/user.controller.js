const { omit } = require("lodash");
const { createUser } = require("../service/user.service");

const createUserHandler = async (req, res) => {
  try {
    const user = await createUser(req.body.username, req.body.password);

    return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

const getCurrentUser = (req, res) => {
  return res.status(200).send(res.locals.user);
};

module.exports = { createUserHandler, getCurrentUser };
