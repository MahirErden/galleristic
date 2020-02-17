var express = require('express');
var router = express.Router();
var passport_artist = require("../config/passport_artist");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("artist_login", {
    title1: "Login Page"
  
  });
});

router.post("/artist_login", passport_artist.authenticate("local"), function(req, res) {
  res.json(req.user);
});

router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;