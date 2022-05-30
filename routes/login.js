const auth = require("../auth.js");
const layout = require("../layout.js");
const model = require("../database/model.js");

const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${client_id};`

function get(request, response) {
    const html = layout(
        "Login",
        /*html*/ `
        <h2>Log in</h2>
        <form action="login" method="POST">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email">

          <label for="password">Password</label>
          <input type="password" id="password" name="password">

          <button>Log in</button>
          <a href="${LOGIN_URL}">Log in with GitHub</a>
        </div>

        <div>
        <a href="/sign-up">Create your account</a>
        </div>
        </form>
      `
      );
      response.send(html);
}

