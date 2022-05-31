const model = require("../database/model.js");

async function post(request, response) {
  const { post_id } = request.body;
  const sid = request.signedCookies.sid;

  // 1 Get user id
  const userID = await model.getSession(sid);
  // 2 Delete post
  await model.deletePost(post_id, userID.id);
  // 3 Redirect to posts
  response.redirect("/posts");
}

module.exports = { post };
