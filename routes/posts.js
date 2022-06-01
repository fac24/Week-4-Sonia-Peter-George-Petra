const model = require("../database/model.js");
const layout = require("../layout.js");

async function get(request, response, next) {
  try {
    const posts = await model.getPosts();
    if (posts.length === 0) {
      console.log("post me");
      response.send(
        layout(
          "posts",
          `<p>Be the first one to post!</p><a href="add-post" class="btn">Add Post</a>`
        )
      );
    } else {
      let postsHTML = `
      <form action="/log-out" method="POST">
      <button type="log-out" class="log-out">Log Out</button>
      </form>`;

      const sid = request.signedCookies.sid;
      if (sid === undefined) {
        throw new Error("SID");
      }
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
            <p>User: ${post.email}</p>
            <p>Dish: ${post.dish}</p>
            <p>recipe: ${post.recipe}</p>
            <p>jokes: ${post.joke}</p>
            <img>food photo: ${post.photo}</img>
            ${deleteButton}
          </div>
        `;
      });
      response.send(layout("posts", postsHTML));
    }
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

module.exports = { get };
