const model = require("../database/model.js");
const layout = require("../layout.js");

function get(request, response) {
  const html = layout(
    `Dishboard`,
    /*html*/ `
    <h1>Dishboard</h1>
    <div class="flex-container login-container">
    
    <form method="POST" action="add-post">

      <label for="dish">Dish Name<span aria-hidden="true">*</span></label>
      <input type="text" name="dish" id="dish" aria-label="Enter the name of the dish" aria-describedby="" required />

      <p>Share the recipe</p>
      <input type="radio" id="recipeUrl" name="recipe" value="recipeURL"/>
      <label for="recipeUrl">URL: <input type="text" name="recipeURL"/></label>
    
      <input type="radio" id="recipeSteps" name="recipe" value="recipeSteps"/>
      <label for="recipeSteps"> Recipe Steps <textarea name="recipeSteps"></textarea></label>

      <label for="joke">Joke</label>
      <input type="text" name="joke" id="joke" aria-label="Enter the joke" aria-describedby="" />

      <button class="btn" type="submit" aria-label="click me to verify">Submit</button>
    </form>
    </div>

    <a class="btn" href="/posts">View all of our top-notch recipes</a>
  `
  );
  response.send(html);
}

async function post(request, response) {
  const form = request.body;
  const recipeType = form.recipe;
  // 1 Get user id
  console.log(form[recipeType]);
  const sid = request.signedCookies.sid;
  const user = await model.getSession(sid);
  // 2 Add post
  await model.addPost(user.id, form.dish, form[recipeType], form.joke);
  // 3 Redirect to posts
  response.redirect("/posts");
}

module.exports = { get, post };
