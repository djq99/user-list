const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});



module.exports = router;
