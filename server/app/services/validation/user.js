const Joi = require("joi");

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateLogin = (req, res, next) => {
  const { error } = login.validate(req.body);

  if (error) {
    res.sendStatus(422);
  } else {
    next();
  }
};

module.exports = { validateLogin };
