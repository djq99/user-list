const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const User = require('../models/User');
const _= require('lodash');


router.get('/',function(req, res, next){
  res.redirect('/');
})
/*Get all users*/
router.post('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/*assign a user*/
router.patch('/:id',function(req,res,next){
  const id = req.params.id;
  const body = _.pick(req.body,['assigned']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  else{
    body.assigned = true;
  }
  User.findOneAndUpdate({
    _id:id,
  },{$set:body},{new:true}).then((user)=>{
    if(!user){
      return res.status(404).send();
    }
    res.send({user});
  }).catch((e)=>{
    return next(e);
  });

})


router.get('*', function(req, res){
  res.status(404).send('Page Not Found!');
});


module.exports = router;
