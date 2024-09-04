// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const artist = await tables.artist.readAll();

    // Respond with the items in JSON format
    res.status(200).json(artist);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const create = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const artist = req.body;

    // Create a new character entry in the database
    const insertId = await tables.artist.create(artist);
    // Respond with HTTP 201 (Created) since the creation was successful
    res.status(201).json({ id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const artist = req.body;

    await tables.artist.update(artist, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

const destroy = async (req, res) => {
  try {
    // Fetch the userId from the request parameters
    const artistId = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.artist.destroy(artistId);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting artist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  create,
  destroy,
  update
};
