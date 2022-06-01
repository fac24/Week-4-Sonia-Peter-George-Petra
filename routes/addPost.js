const model = require("../database/model.js");
const layout = require("../layout.js");

function get(request, response) {
  const html = layout(
    `Dishboard`,
    /*html*/ `
    <div class="flex-container login-container">
    <h1>Dishboard</h1>
    
    <form method="POST" action="add-post">

      <label for="dish">Dish Name<span aria-hidden="true">*</span></label>
      <input type="text" name="dish" id="dish" aria-label="Enter the name of the dish" aria-describedby="" required />

      <h2>Share the recipe</h2>

        <div>
      <input type="radio" id="recipeUrl" name="recipe" value="recipeURL"/>
      <label for="recipeUrl">URL: <input type="text" name="recipeURL"/></label>
        </div>

        <div>
      <input type="radio" id="recipeSteps" name="recipe" value="recipeSteps"/>
      <label for="recipeSteps"> Recipe Steps <textarea name="recipeSteps"></textarea></label>
        </div>

      <label for="joke">Joke</label>
      <input type="text" name="joke" id="joke" aria-label="Enter the joke" aria-describedby="" />

      <button class="btn" type="submit" aria-label="click me to verify">Submit</button> 
      <a class="btn" href="/posts">View all the posts</a>
    </form>
    </div>
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
