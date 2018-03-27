const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

/*Get all users*/
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});



module.exports = router;
