var express = require("express");
var router = express.Router();

const axios = require("axios");

const clientID = "a2170420b7e77a612f17";
const clientSecret = "a1419aefaea2ded436032b9bac9a96841bbdfa35";

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// Declare the redirect route
router.get("/oauth/redirect", (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code;
  axios({
    // make a POST request
    method: "post",
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: "application/json"
    }
  }).then(response => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token;
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/welcome.html?access_token=${accessToken}`);
  });
});

module.exports = router;
