const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    let streetarts = [];

    if (req.query.type === "recent") {
      streetarts = await tables.streetart.readRecent();
    } else {
      streetarts = await tables.streetart.readAll();
    }

    // Respond with the items in JSON format
    res.status(200).json(streetarts);
  } catch (err) {
    // Respond with a 500 Internal Server Error and detailed error message
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

// The R of BREAD - Read (Single Item) operation
const read = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch a single item by ID from the database
    const streetart = await tables.streetart.readById(id);

    if (streetart) {
      // Respond with the item in JSON format
      res.status(200).json(streetart);
    } else {
      // Respond with a 404 Not Found if the item is not found
      res.status(404).json({
        error: "StreetArt not found",
      });
    }
  } catch (err) {
    // Respond with a 500 Internal Server Error and detailed error message
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

const create = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const streetart = req.body;

    // Create a new character entry in the database
    const insertId = await tables.streetart.create(streetart, req.file);
    // Respond with HTTP 201 (Created) since the creation was successful
    res.status(201).json({ id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res) => {
  try {
    // Fetch the userId from the request parameters
    const streetartID = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.streetart.destroy(streetartID);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting streetart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/streetartActions.js
const update = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const streetart = req.body;

    // Create a new character entry in the database
    await tables.streetart.update(streetart, req.file, req.params.id);
    // Respond with HTTP 201 (Created) since the creation was successful
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  read,
  destroy,
  create,
  update,
};
