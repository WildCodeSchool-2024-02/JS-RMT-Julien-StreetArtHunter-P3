// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const seen = await tables.seen.readAll();

    // Respond with the items in JSON format
    res.status(200).json(seen);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const update = async (req, res, next) => {
  // Extract the seen data from the request body and params

  try {
    // Update the seen in the database
    await tables.seen.update(req.body, req.params.streetArtId);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  update,
};
