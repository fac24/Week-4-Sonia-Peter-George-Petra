const model = require("../database/model.js");
const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const form = /*html*/ `
  <div class="flex-container login-container">  

  <h2>Create a new account</h2>

    <form action="sign-up" method="POST">
      <div class="flex-container">
        <a class="btn" href="/">Back to login</a>
        <a class="btn" href="">Login Via GitHub</a>
    </div>

        <label for="email">
            Email<span aria-hidden="true">*</span>
        </label>
        <input name="email" id="email" aria-label="Enter your email" aria-describedby="emailRequirements emailError" required ></input>
    
        <label for="password">
            Password <span aria-hidden="true">*</span>
        </label>
        <input type="password"id="password" name="password" required></input>
        
        <button type="submit" aria-label="click me to verify" class="btn">submit</button>
    </form>
    </div>
    `;

  response.send(layout("Sign Up", form));
}

// this will add a user to the database.
async function post(request, response, next) {
  try {
    const { email, password } = request.body;

    const user = await auth.createUser(email, password);
    if (user === undefined) {
      throw new Error("user");
    }
    const cookie = response.cookie("sid", user, auth.COOKIE_OPTIONS);
    if (cookie === undefined) {
      throw new Error("COOKIE");
    }
    // directing this back to the path
    response.redirect("/posts");
    //exits the functionality
    return cookie;
  } catch (error) {
    const errorMessage = error.message;
    if (errorMessage === "SID") {
      error.status = 401;
      error.message =
        "<h1>You are unauthorised as you don't have a session ID</h1>";
    }
    next(error);
  }
}

module.exports = { get, post };
