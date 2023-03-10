module.exports = {
  isLoginAdmin: (req, res, next) => {
    if ((req.session.user === null) | (req.session.user === undefined)) {
      req.flash("alertMessage", `Session habis, silahkan login kembali`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    } else {
      next();
    }
  },
};
