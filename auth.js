const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");

async function verifyUser(email, password) {
    const user = await model.getUser(email);
    if(user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch) {
            return user
        } else {
            console.error("Cannot verify password.")
            return false;
        }
    } else {
        console.error("No user found.");
        return false;
    }
}

async function createSession(user) {
    const sid = crypto.randomBytes(18).toString("base64");
    return await model.createSession(sid, {user});
}

module.exports = {
    verifyUser,
    createSession
}