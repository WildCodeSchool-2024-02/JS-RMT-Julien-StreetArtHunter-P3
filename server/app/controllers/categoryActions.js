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

module.exports = {
  browse,
};
