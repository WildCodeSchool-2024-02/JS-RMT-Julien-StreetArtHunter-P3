const Joi = require("joi");

const artistSchema = Joi.object({
  name: Joi.string().max(255).required(),
  points: Joi.number().required(),
});

const validateArtist = (req, res, next) => {
  const { error } = artistSchema.validate(req.body);

  if (error) {
    res.status(422).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateArtist };
