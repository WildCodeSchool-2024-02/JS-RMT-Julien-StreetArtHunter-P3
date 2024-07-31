// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const user = await tables.user.readAll();

    // Respond with the items in JSON format
    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const login = async (rec, res) => {
  res.send("hello world");
};
// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  login,
};
