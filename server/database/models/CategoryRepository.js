const AbstractRepository = require("./AbstractRepository");

class CategoryRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "category" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `select id, title from ${this.table}`
    );

    // Return the array of users
    return rows;
  }
}
module.exports = CategoryRepository;
