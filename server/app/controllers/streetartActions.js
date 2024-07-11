// Import access to database tables
const client = require("../../database/client");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const [streetart] = await client.query("SELECT * FROM streetart");

    // Respond with the items in JSON format
    res.status(200).json(streetart);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

module.exports = {
  browse,
};
