const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");

async function createUser(email, password) {
  const sid = await crypto.randomBytes(18).toString("base64");
  const hashPw = await bcrypt.hash(password, 10);
  const addUser = await model.createUser(email, hashPw);
  const session = createSession(addUser);
  return session;
}

module.export = createUser;
