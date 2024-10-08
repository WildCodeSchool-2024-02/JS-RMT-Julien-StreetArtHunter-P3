// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const category = await tables.category.readAll();

    // Respond with the items in JSON format
    res.status(200).json(category);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const create = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const category = req.body;

    // Create a new character entry in the database
    const insertId = await tables.category.create(category);
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
    const categoryId = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.category.destroy(categoryId);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting category:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  browse,
  destroy,
  create,
};
