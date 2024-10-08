const AbstractRepository = require("./AbstractRepository");

class CityRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "city" });
  }

  // The C of CRUD - Create operation

  async create(city) {
    // Execute the SQL INSERT query to add a new user to the "city" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, points) values (?, ?)`,
      [city.name, city.points]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  /** 
  // The Rs of CRUD - Read operations

  async read(id) {
    Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

*/

  async readAll() {
    // Execute the SQL SELECT query to retrieve all artists from the "city" table
    const [rows] = await this.database.query(
      `select id, name, points from ${this.table}`
    );

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  /** 
  async update(user) {
    // Execute the SQL UPDATE query to update a specific category
    const [result] = await this.database.query(
      `update ${this.table} set pseudo = ?, email = ? where id = ?`,
      [user.pseudo, user.email, user.id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
  //   ...
  // }
*/

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID
  async destroy(cityID) {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [cityID]
    );
    return rows;
  }
}
module.exports = CityRepository;
