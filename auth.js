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

const COOKIE_OPTIONS = {
  httpOnly: true,
  // maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

async function verifyUser(email, password) {
  const user = await model.getUser(email);
  if (user) {
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      return user;
    } else {
      console.error("Cannot verify password.");
      return false;
    }
  } else {
    console.error("No user found.");
    return false;
  }
}

async function createSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");
  return await model.createSession(sid, { user });
}

module.exports = {
  verifyUser,
  createSession,
  COOKIE_OPTIONS,
  createUser,
};
