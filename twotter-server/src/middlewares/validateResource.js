// const yup = require('yup')

const validate = (schema = {}) => (req, res, next) => {
  schema
    .validate(req.body)
    .then(() => next())
    .catch((err) => res.status(400).send(err.errors));
};

module.exports = validate;
