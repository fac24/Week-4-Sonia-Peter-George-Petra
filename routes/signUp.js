const model = require("../database/model.js");
const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const form = `
    <h2>Create a new account</h2>
    <div>
        <a href="./login.js">Back to login</a>
        <a href="">Sign Up with GitHub</a>
    </div>
    <form action="sign-up" method="POST">
        <label for="email">
            Email<span aria-hidden="true">*</span>
        </label>
        <input name="email" id="email" aria-label="Enter your email" aria-describedby="emailRequirements emailError" required ></input>
    
        <label for="password">
            Password <span aria-hidden="true">*</span>
        </label>
        <input type="password"id="password" name="password" required></input>
        
        <button type="submit" aria-label="click me to verify">submit</button>
    </form>`;

  response.send(layout("Sign Up", form));
}

//async function post(request, response) {
//...
//const user = await auth.createUser(email, password);
// #### Make a session here to?
//response.redirect("/posts");
// }

function post(request, response, next) {
  const { email, password } = request.body;
  console.log(username);
}

module.exports = { get, post };
