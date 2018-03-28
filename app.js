const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('./db_config/db');
const user = require('./routes/user');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/', express.static(path.join(__dirname, 'dist')));

app.use('/user', user);

app.get('*', function(req, res){
  res.status(404).send('Page Not Found!');
});



module.exports = app;
