var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.get('/logout', function(req, res, next) {
    res.send("Logging out");
});

router.get('/google', function(req, res, next) {
    res.send("Logging in with google ");
});


module.exports = router;
