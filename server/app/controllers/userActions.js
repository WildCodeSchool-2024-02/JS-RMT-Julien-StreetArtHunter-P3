const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);

    if (user == null) {
      res.sendStatus(403);
    } else if (req.body.password === user.password) {
      res.status(200).json({ connected: true });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
};

// The of BREAD - Add (Create) operation
const create = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;

  try {
    const hashedPassword = await argon2.hash(user.password);

    // Modify user data to include hashed password
    const userData = {
      ...user,
      password: hashedPassword,
    };

    // Insert the item into the database
    await tables.user.create(userData);

    // Remove hashed password
    delete userData.password;

    // Generate JWT token
    const token = jwt.sign(
      { sub: userData.id, is_admin: userData.is_admin },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    // Respond with HTTP 200 (OK) and the user data (without password)
    res.status(200).json(userData);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};



/**
 // The E of BREAD - Edit (Update) operation
 // This operation is not yet implemented

 const update = async (req, res, next) => {
 // Extract the user data from the request body and params
 const userId = { ...req.body, id: req.params.id };

 try {
 // Update the user in the database
 await tables.user.update(userId);

 // Respond with HTTP 204 (No Content)
 res.sendStatus(204);
 } catch (err) {
 // Pass any errors to the error-handling middleware
 next(err);
 }
 };
 */

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

const destroy = async (req, res) => {
  try {
    // Fetch the userId from the request parameters
    const userId = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.user.destroy(userId);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  destroy,
  login,
  create,
};
