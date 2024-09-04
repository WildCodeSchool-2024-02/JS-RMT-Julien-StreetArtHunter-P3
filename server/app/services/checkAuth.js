const jwt = require("jsonwebtoken");

const checkCookie = (req, res, next) => {
  if (req.cookies.token) {
    const decoded = jwt.verify(req.cookies.token, process.env.APP_SECRET);
    if (decoded) {
      req.auth = decoded;
      next();
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

const checkAdmin = (req, res, next) => {
  if (req.auth.is_admin === 1) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = { checkCookie, checkAdmin };
