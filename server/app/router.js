const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const streetartActions = require("./controllers/streetartActions");

// Route to get a list of streetarts
router.get("/streetarts", streetartActions.browse);

const userActions = require("./controllers/userActions");

// Route to get a list of users
router.get("/users", userActions.browse);

// Route to delete a list of users
router.delete("/users/:id", userActions.destroy);

router.post("/login", userActions.login);

const artistActions = require("./controllers/artistActions");

// Route to get a list of artists
router.get("/artists", artistActions.browse);

// Route to delete a list of artists
router.delete("/artists/:id", artistActions.destroy);

const categoryActions = require("./controllers/categoryActions");

router.get("/categories", categoryActions.browse);

module.exports = router;
