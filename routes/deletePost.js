const model = require("../database/model.js");

async function post(request, response, next) {
  try {
    const { post_id } = request.body;
    const sid = request.signedCookies.sid;
    if (sid === undefined) {
      throw new Error("SID");
    }
    // 1 Get user id
    const userID = await model.getSession(sid);
    if (userID === undefined) {
      throw new Error("userID");
    }
    // 2 Delete post
    await model.deletePost(post_id, userID.id);
    // 3 Redirect to posts
    response.redirect("/posts");
  } catch (error) {
    const errorMessage = error.message;
    if (errorMessage === "SID") {
      error.status = 401;
      error.message =
        "<h1>You are unauthorised as you don't have a session ID</h1>";
    } else if (errorMessage === "user") {
      error.status = 403;
      error.message =
        "<h1>No user you are Forbidden from going to this page</h1>";
    }
    next(error);
  }
}

module.exports = { post };
