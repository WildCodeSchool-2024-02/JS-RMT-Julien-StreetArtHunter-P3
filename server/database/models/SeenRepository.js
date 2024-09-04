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
    seen.user_id,
    seen.proof as proof_image,
    streetart.image_url as streetart_image,
    streetart.title,
    user.pseudo,
    seen.seen_status_id as seen_status_select
FROM 
    ${this.table}
INNER JOIN 
    streetart ON seen.streetart_id = streetart.id
INNER JOIN 
    user ON seen.user_id = user.id
`);

    // Return the array of users
    return rows;
  }

  async update(payload, streetArtId) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET seen_status_id = ? WHERE streetart_id = ? AND user_id = ?`,
      [payload.status, streetArtId, payload.user]
    );

    return result.affectedRows;
  }

  async create(streetArtId, proof, userId) {
    const [result] = await this.database.query(
      `insert into ${this.table} (user_id, streetart_id, proof) values (?, ?, ?)`,
      [userId, streetArtId, `assets/proofs/${proof}`]
    );

    // Return the ID of the newly inserted user
    return result.affectedRows;
  }
}
module.exports = SeenRepository;
