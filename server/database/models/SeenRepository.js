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

  async readByUserId(auth) {
    const [rows] = await this.database.query(
      `SELECT 
    s.streetart_id,
    s.proof as proof_image,
    str.image_url as streetart_image,
    str.title,
    sst.label as status,
    (str.points + a.points + c.points) as points,
    c.name as city_name,
    str.created_at, 
    a.name as artist_name

    FROM 
        ${this.table} as s
    INNER JOIN 
        streetart as str ON s.streetart_id = str.id
    INNER JOIN 
        artist as a ON str.artist_id = a.id
    INNER JOIN 
        city as c ON str.city_id = c.id 
    INNER JOIN 
        seen_status as sst ON s.seen_status_id = sst.id 
    WHERE s.user_id = ?
    `,
      [auth.user_id]
    );

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
}
module.exports = SeenRepository;
