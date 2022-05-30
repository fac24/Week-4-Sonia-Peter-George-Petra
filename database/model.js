const db = require("./connection.js");

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
    `
    const sid = await db.query(INSERT_SESSION, [sessionId, data])
    return sid.rows[0]['sid'];
}

module.exports = {
    getUser, 
    createSession
}