const { deleteSession } = require("../database/model.js");

async function post(request, response, next) {
  try {
    const sid = request.signedCookies.sid;
    if (sid === undefined) {
      return new Error("SID");
    }
    await deleteSession(sid);
    response.clearCookie("sid");
    response.redirect("/");
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

module.exports = { post };
