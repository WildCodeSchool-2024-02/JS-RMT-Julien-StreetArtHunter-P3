const jwt = require("jsonwebtoken");

const checkCookie = (req, res, next) => {
  if (req.cookies.token) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const checkAdmin = (req, res, next) => {
  const decoded = jwt.verify(req.cookies.token, process.env.APP_SECRET);

  if (decoded.is_admin === 1) {
    req.auth = decoded;
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = { checkCookie, checkAdmin };
