const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const itemActions = require("./controllers/itemActions");
const streetartActions = require("./controllers/streetartActions");

// Route to get a list of items
router.get("/streetart", streetartActions.browse);

// Route to get a specific item by ID
router.get("/:id", itemActions.read);

// Route to add a new item
router.post("/", itemActions.add);

/* ************************************************************************* */

module.exports = router;
