// Import the repository modules responsible for handling data operations on the tables
// const ItemRepository = require("./models/ItemRepository");
const UserRepository = require("./models/UserRepository");
const StreetartRepository = require("./models/StreetartRepository");
const CategoryRepository = require("./models/CategoryRepository");
const ArtistRepository = require("./models/ArtistRepository");
const CityRepository = require("./models/CityRepository");
const SeenRepository = require("./models/SeenRepository");

// Create an empty object to hold data repositories for different tables
const tables = {
  streetart: new StreetartRepository(),
  user: new UserRepository(),
  category: new CategoryRepository(),
  artist: new ArtistRepository(),
  city: new CityRepository(),
  seen: new SeenRepository(),
};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
// tables.item = new ItemRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
