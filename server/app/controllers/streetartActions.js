const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const streetarts = await tables.streetart.readAll();

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

module.exports = {
  browse,
  read,
};
