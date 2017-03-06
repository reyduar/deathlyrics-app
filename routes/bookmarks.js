var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    name: "Ariel",
    last: "Duarte"
  });
});

module.exports = router;
