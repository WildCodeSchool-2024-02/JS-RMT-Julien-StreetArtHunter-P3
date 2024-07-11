const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const userActions = require("./controllers/userActions");

// Route to get a list of items
router.get("/user", userActions.browse);

// Route to get a specific item by ID
router.get("/:id", userActions.read);

// Route to add a new item
router.post("/", userActions.add);

/* ************************************************************************* */

module.exports = router;
