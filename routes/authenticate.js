const api = require("../api");
const auth = require("../auth");

const client_id = process.env.CLIENT_ID;
const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${client_id}`;

async function get(request, response) {
  const code = request.query.code;

  const token = await api.getToken(code);
  const user = await api.getUser(token);
  response.cookie("user", user.login, auth.COOKIE_OPTIONS);
  response.redirect("/posts");
}

module.exports = { get };
