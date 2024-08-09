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
        a.name FROM 
        ${this.table} AS s INNER JOIN 
        artist AS a ON 
        s.artist_id = a.id INNER JOIN
        city AS c ON s.city_id = c.id `
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
          s.geolocation_x, 
          s.geolocation_y, 
          s.image_url, 
          s.image_alt, 
          c.name AS city_name, 
          a.name AS artist_name
        FROM ${this.table} AS s
        INNER JOIN artist AS a ON s.artist_id = a.id
        INNER JOIN city AS c ON s.city_id = c.id
        WHERE s.id = ?`,
        [id]
      );
  
      return rows[0];
    }
  
    
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

module.exports = StreetartRepository;
