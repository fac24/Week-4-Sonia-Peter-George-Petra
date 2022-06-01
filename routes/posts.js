const model = require("../database/model.js");
const layout = require("../layout.js");

async function get(request, response) {
  const posts = await model.getPosts();
  const postsPage = `
  <h1>Dishboard</h1>
  <div class="flex-container login-container">
    <h2>Be the first one to post!</h2>
    <a href="/add-post" class="add-post-link">Share the dish</a>
  </div>
  `;
  if (posts.length === 0) {
    console.log("post me");
    response.send(layout("posts", postsPage));
  } else {
    let postsHTML = `
    <a href="/add-post" class="add-post-link">Share the dish</a>
    <form action="/log-out" method="POST">
    <button type="log-out" class="log-out">Log Out</button>
    </form>`;

    const sid = request.signedCookies.sid;
    const userData = await model.getSession(sid);

    if (!userData) {
      return response.redirect("/");
    }

    posts.map((post) => {
      console.log(post);
      let deleteButton = "";
      // if the posts equals the array of objects with data most needed.
      if (post.user_id === userData.id) {
        deleteButton = /*html*/ ` 
          <form action="/delete-post" method="POST">
            <button class="delete-button" name="post_id" value="${post.id}" aria-label="Delete ${post.post}">
              &times;
            </button>
          </form>
        `;
      }
      postsHTML += `
        <div class="post-container">
          <p class="">User: ${post.email}</p>
          <p>Name of the dish: ${post.dish}</p>
          <p>Recipe Or URL: ${post.recipe}</p>
          <p>Joke: ${post.joke}</p>
          ${deleteButton}
        </div>
      `;
    });
    response.send(layout("posts", postsHTML));
  }
}

module.exports = { get };
