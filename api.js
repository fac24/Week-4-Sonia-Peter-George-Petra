// allows to fetch the data
const { default: fetch } = require("node-fetch");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const TOKEN_URL = "https://github.com/login/oauth/access_token";

async function getToken(code) {
  const body = { client_id, client_secret, code };
  const tokenJson = await fetch(TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { accept: "application/json", "content-type": "application/json" },
  });
  const token = getJson(tokenJson);
  return token.access_token;
}

const USER_URL = "https://api.github.com/user";

async function getUser(token) {
  const userJson = await fetch(USER_URL, {
    headers: { accept: "application/json", authorization: `token ${token}` },
  });
  return getJson(userJson);
}

function getJson(response) {
  if (!response.ok) {
    const error = new Error("HTTP Error");
    error.status = response.statusCode;
    throw error;
  }
  return response.json();
}

module.exports = {
  getToken,
  getUser,
};
