const Joi = require("joi");

const streetartSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
  geolocation_x: Joi.number().precision(10, 6).required(),
  geolocation_y: Joi.number().precision(9, 6).required(),
  image_url: Joi.string().max(255).required(),
  city_id: Joi.number().integer().required(),
  artist_id: Joi.number().integer().required(),
});

const validateStreetart = (req, res, next) => {
  const { error } = streetartSchema.validate(req.body);

  if (error) {
    res.status(422).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateStreetart };
