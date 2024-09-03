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

  async create(category) {
    // Execute the SQL INSERT query to add a new user to the "city" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title) values (?)`,
      [category.title]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async destroy(categoryID) {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [categoryID]
    );
    return rows;
  }
}
module.exports = CategoryRepository;
