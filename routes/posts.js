const model = require("../database/model.js");
const layout = require("../layout.js");

async function get(request, response) {
  const posts = await model.getPosts();
  if (posts.length === 0) {
    console.log("post me");
    response.send(layout("posts", "<p>Be the first one to post!</p>"));
  } else {
    let postsHTML = "";
    const sid = request.signedCookies.sid;
    const userData = await model.getSession(sid);

    posts.map((post) => {
      console.log(post);
      let deleteButton = "";
      // if the posts equals the array of objects with data most needed.
      if (post.user_id === userData.id) {
        console.log("I");
        deleteButton = /*html*/ ` 
          <form action="/delete-post" method="POST">
            <button class="delete-button" name="post_id" value="${post.id}" aria-label="Delete ${post.post}">
              &times;
            </button>
          </form>
        `;
      }

      postsHTML += `
        <div>
          <p>User: ${post.email}</p>
          <p>recipe: ${post.recipe}</p>
          <p>jokes: ${post.joke}</p>
          <img>food photo: ${post.photo}</img>
          ${deleteButton}
        </div>
      `;
    });
    console.log(postsHTML);
    response.send(layout("posts", postsHTML));
  }
}

module.exports = { get };
