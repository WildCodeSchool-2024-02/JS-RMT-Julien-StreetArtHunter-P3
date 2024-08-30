const AbstractRepository = require("./AbstractRepository");

class SeenRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "seen" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all artists from the "artist" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }
}
module.exports = SeenRepository;
