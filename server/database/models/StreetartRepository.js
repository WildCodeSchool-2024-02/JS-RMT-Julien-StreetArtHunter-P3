const AbstractRepository = require("./AbstractRepository");

class StreetartRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "streetart" as configuration
    super({ table: "streetart" });
  }

  // The C of CRUD - Create operation

  /** async create(streetart) {
    // Execute the SQL INSERT query to add a new streetart to the "streetart" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [streetart.title, streetart.user_id]
    );

    // Return the ID of the newly inserted streetart
    return result.insertId;
  } 
*/
  // The Rs of CRUD - Read operations

  /** async read(id) {
    // Execute the SQL SELECT query to retrieve a specific streetart by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the streetart
    return rows[0];
  }
 */

  async readAll() {
    // Execute the SQL SELECT query to retrieve all streetarts from the "streetart" table
    const [rows] = await this.database.query(
      `SELECT 
       s.id, 
       s.title, 
       s.geolocation_x, 
       s.geolocation_y, 
       s.image_url, 
       s.image_alt, 
       c.name AS city_name, 
       a.name AS artist_name,
       cat.title AS category_title
     FROM ${this.table} AS s
     INNER JOIN artist AS a ON s.artist_id = a.id
     INNER JOIN city AS c ON s.city_id = c.id
     INNER JOIN category AS cat ON s.category_id = cat.id`
    );

    // Return the array of streetarts
    return rows;
  }

  // Method to read a specific streetart by its ID
  async readById(id) {
    // Execute the SQL SELECT query to retrieve a specific streetart by its ID
    const [rows] = await this.database.query(
      `SELECT 
          s.id, 
          s.title, 
          s.description,
          s.geolocation_x, 
          s.geolocation_y, 
          s.image_url, 
          s.image_alt, 
          c.name AS city_name, 
          a.name AS artist_name,
          cat.title AS category_title
        FROM ${this.table} AS s
        INNER JOIN artist AS a ON s.artist_id = a.id
        INNER JOIN city AS c ON s.city_id = c.id
        INNER JOIN category AS cat ON s.category_id = cat.id
        WHERE s.id = ?`,
      [id]
    );
    return rows[0];
  }

  async readRecent(limit = 3) {
    const [rows] = await this.database.query(
      `SELECT 
        s.id, 
        s.title, 
        s.geolocation_x, 
        s.geolocation_y, 
        s.image_url, 
        s.image_alt, 
        s.created_at,
        c.name AS city_name, 
        a.name FROM 
        ${this.table} AS s 
        INNER JOIN artist AS a ON s.artist_id = a.id 
        INNER JOIN city AS c ON s.city_id = c.id 
        ORDER BY s.created_at DESC
        LIMIT ?`,
      [limit]
    );
    return rows;
  }

  async create(streetart, filename) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, geolocation_x, geolocation_y, image_url, category_id, city_id, artist_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        streetart.title,
        streetart.description,
        streetart.geolocation_x,
        streetart.geolocation_y,
        streetart.image_url,
        streetart.category_id,
        streetart.city_id,
        streetart.artist_id,
      ]
    );
    return result.insertId;
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing streetart

  // async update(streetart) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an streetart by its ID

  // async delete(id) {
  //   ...
  // }

  async destroy(streetartID) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [streetartID]
    );
    return rows;
  }
}

module.exports = StreetartRepository;
