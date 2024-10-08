// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const city = await tables.city.readAll();

    // Respond with the items in JSON format
    res.status(200).json(city);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const create = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const city = req.body;

    // Create a new character entry in the database
    const insertId = await tables.city.create(city);
    // Respond with HTTP 201 (Created) since the creation was successful
    res.status(201).json({ id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

const destroy = async (req, res) => {
  try {
    // Fetch the userId from the request parameters
    const cityId = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.city.destroy(cityId);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting city:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  create,
  destroy,
};
