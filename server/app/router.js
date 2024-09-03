const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const streetartActions = require("./controllers/streetartActions");

const { checkCookie, checkAdmin } = require("./services/checkAuth");
const { validateLogin } = require("./services/validation/user");
const { validateStreetart } = require("./services/validation/streetart");

// Route to get a list of streetarts
router.get("/streetarts", streetartActions.browse);

// Route to get a specific streetart by ID
router.get("/streetarts/:id", streetartActions.read);

router.delete(
  "/streetarts/:id",
  checkCookie,
  checkAdmin,
  streetartActions.destroy
);

router.post(
  "/streetarts",
  checkCookie,
  checkAdmin,
  validateStreetart,
  streetartActions.create
);

const userActions = require("./controllers/userActions");

// Route to get a list of users
router.get("/users", checkCookie, checkAdmin, userActions.browse);

// Route to delete a list of users
router.delete("/users/:id", checkCookie, checkAdmin, userActions.destroy);

router.post("/login", validateLogin, userActions.login);

const artistActions = require("./controllers/artistActions");

// Route to get a list of artists
router.get("/artists", checkCookie, checkAdmin, artistActions.browse);

// Route to delete a list of artists
router.delete("/artists/:id", checkCookie, checkAdmin, artistActions.destroy);

const categoryActions = require("./controllers/categoryActions");

router.get("/categories", checkCookie, checkAdmin, categoryActions.browse);

router.delete(
  "/categories/:id",
  checkCookie,
  checkAdmin,
  categoryActions.destroy
);

const cityActions = require("./controllers/cityActions");

// Route to get a list of cities
router.get("/cities", checkCookie, checkAdmin, cityActions.browse);

// Route to delete a list of cities
router.delete("/cities/:id", checkCookie, checkAdmin, cityActions.destroy);

router.post("/register", userActions.create);

const seenActions = require("./controllers/seenActions");

router.get("/views", checkCookie, seenActions.browse);

router.put("/views/:streetArtId", checkCookie, checkAdmin, seenActions.update);

module.exports = router;
