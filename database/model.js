const db = require("./connection.js");

async function createUser(email, password) {
  const INSERT_USER = /*sql*/ `
    INSERT INTO users (email, password) VALUES ($1, $2)
    RETURNING id, email
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

async function getSession(sessionId) {
  const GET_SESSION = /*sql*/ `
    SELECT data FROM sessions WHERE sid = $1
  `;
  const user = await db.query(GET_SESSION, [sessionId]);
  // returns {id: user_id, email: useremail}
  return user.rows[0].data.user;
}

async function addPost(
  user_id,
  dish,
  recipe = undefined,
  joke = undefined,
  photo = undefined
) {
  const INSERT_POST = /*sql*/ `
    INSERT INTO posts (user_id, dish, recipe, joke, photo) VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;
  const addedID = await db.query(INSERT_POST, [
    user_id,
    dish,
    recipe,
    joke,
    photo,
  ]);
  return addedID.rows[0];
}

async function deletePost(post_id, user_id) {
  const DELETE_POST = `
      DELETE FROM posts WHERE id = $1 AND id = $2
      RETURNING  id, user_id, post
  `;

  const deleteByID = await db.query(DELETE_POST, [post_id, user_id]);
  return deleteByID.rows[0];
}

module.exports = {
  getUser,
  createSession,
  getSession,
  createUser,
  addPost,
  deletePost,
};
