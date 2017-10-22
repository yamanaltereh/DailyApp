var express = require('express');
var router = express.Router();
// var models = require('./models');
// var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new'), function(req, res, next) {
  res.render('new');
}

router.post('/'), function(req, res, next) {
  var user = User.build({ first_name: "John", last_name: "Doe "});
}

module.exports = router;
