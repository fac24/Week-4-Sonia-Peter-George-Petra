const { deleteSession } = require("../database/model.js");

async function post(req, res, next) {
  const sid = await req.signedCookies.sid;
  deleteSession(sid)
    .then(() => {
      res.clearCookie("sid");
      res.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
}

module.exports = { post };
