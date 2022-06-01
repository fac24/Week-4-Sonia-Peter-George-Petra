const { deleteSession } = require("../database/model.js");

async function post(request, response, next) {
  try {
    const sid = request.signedCookies.sid;
    if (sid === undefined) {
      return new Error();
    }
    await deleteSession(sid);
    response.clearCookie("sid");
    response.redirect("/");
  } catch (error) {
    console.error(error);
    response.status(401);
    next(error);
  }
}

module.exports = { post };
