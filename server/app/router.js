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

router.post("/register", userActions.create);

module.exports = router;
