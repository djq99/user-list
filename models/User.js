const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name:{
    title: String,
    first: String,
    last: String,
  },
  picture:{
    large: String,
    medium: String,
    thumbnail: String
  },
  assigned:{
    type:Boolean,
    default:false
  }

});

module.exports = mongoose.model('User', UserSchema);
