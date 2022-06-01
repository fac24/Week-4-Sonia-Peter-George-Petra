const auth = require("../auth.js");
const layout = require("../layout.js");
const model = require("../database/model.js");

const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;
const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${client_id}`;

function get(request, response) {
  const html = layout(
    "Login",
    /*html*/ `
    <div class="flex-container login-container">
        <h2>Log in</h2>
   
        <form method="POST" id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" name="email">

          <label for="password">Password</label>
          <input type="password" id="password" name="password">

          <button class="btn" type="submit">Log in</button>
        </form>
        <hr>
        <a class="btn" href="${LOGIN_URL}">Log in with GitHub</a>
      </div>

        <div class="flex-container login-container">
        <form action="/sign-up">
          <button class="btn" id="sign-up-link">Create your account</button>
        </form>
        </div>
      `
  );
  response.send(html);
}

async function post(request, response) {
  const { email, password } = request.body;
  const user = await auth.verifyUser(email, password);
  if (user) {
    const sid = auth.createSession(user);
    response.cookie("sid", sid, auth.COOKIE_OPTIONS);
    response.redirect("/posts");
  } else {
    response.redirect("/");
  }
}

module.exports = {
  post,
  get,
};
