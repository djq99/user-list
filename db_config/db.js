const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./../models/User');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/user_list', { promiseLibrary: require('bluebird') })
    .then(() =>  {

      mongoose.connection.db.listCollections({name: 'users'})
        .next(function(err, collinfo) {
          if (collinfo) {
            // The collection exists
            console.log(collinfo);
          }
          else{
            console.log('db is empty');
            fs.readFile('./db_config/user-profiles-5000.json', 'utf8', function (err, data) {
                  if (err) throw err;
                  let obj = JSON.parse(data).results;
                  User.insertMany(obj,(err)=>{
                    if(err){
                      console.log(err);
                    }
                    console.log("seed data has been imported successfully!")
                  });
                });
          }
        });

    })
.catch((err) => console.error(err));


module.exports = {mongoose};
