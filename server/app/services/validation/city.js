const Joi = require("joi");

const citySchema = Joi.object({
  name: Joi.string().max(255).required(),
  points: Joi.number().required(),
});

const validateCity = (req, res, next) => {
  const { error } = citySchema.validate(req.body);

  if (error) {
    res.status(422).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateCity };
