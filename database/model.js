const db = require("./connection.js");

async function createUser(email, password) {
  const INSERT_USER = `
                        INSERT INTO users (email, password) VALUES ($1, $2)
                        RETURNING email
                        `;
  // using an await to to insert new data into the database.
  const DBInsert = await db.query(INSERT_USER, [email, password]);
  // inserting this into new rows and then returning
  const user = DBInsert.rows[0];
  return user;
}

module.exports = createUser;
