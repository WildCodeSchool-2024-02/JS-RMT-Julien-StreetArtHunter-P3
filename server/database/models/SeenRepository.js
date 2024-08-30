const AbstractRepository = require("./AbstractRepository");

class SeenRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "seen" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all artists from the "artist" table
    const [rows] = await this.database.query(`SELECT 
    seen.streetart_id,
    seen.proof as proof_image,
    streetart.image_url as streetart_image,
    streetart.title,
    user.pseudo,
    seen_status.label
FROM 
    ${this.table}
INNER JOIN 
    streetart ON seen.streetart_id = streetart.id
INNER JOIN 
    user ON seen.user_id = user.id
INNER JOIN 
    seen_status ON seen.seen_status_id = seen_status.id;
`);

    // Return the array of users
    return rows;
  }
}
module.exports = SeenRepository;
