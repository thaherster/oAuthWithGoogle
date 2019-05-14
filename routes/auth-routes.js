var express = require("express");
var router = express.Router();

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/logout", function(req, res, next) {
  res.send("Logging out");
});

router.get("/oauth/redirect", function(req, res, next) {
  res.send("Redirecting route");
});

module.exports = router;
