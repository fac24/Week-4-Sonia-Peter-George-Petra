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
async function getUser(email) {
  const SELECT_USER = `
    SELECT id, email, password FROM users WHERE email=$1
    `;
  const user = await db.query(SELECT_USER, [email]);
  return user.rows[0];
}

async function createSession(sessionId, data) {
  const INSERT_SESSION = `
    INSERT INTO sessions(sid, data) VALUES ($1, $2)
    RETURNING sid;
    `;
  const sid = await db.query(INSERT_SESSION, [sessionId, data]);
  return sid.rows[0]["sid"];
}

module.exports = {
  getUser,
  createSession,
  createUser,
};
