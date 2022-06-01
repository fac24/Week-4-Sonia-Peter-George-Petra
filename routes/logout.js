const { deleteSession } = require("../database/model.js");

function post(req, res, next) {
  const sid = req.signedCookies.sid;
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
