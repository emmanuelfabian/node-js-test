var express = require('express');

var router = express.Router();

 
 const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contact_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

'use strict';
var mongoose = require('mongoose');
var authz = require('mongoose-authorization');
 
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
   status: {
    type: String,
    required: true,
    default: 'active'
  }
 
});



/**var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
 
/*
 * Make sure you add this before compiling your model
 */
userSchema.permissions = {
  defaults: {
    read: ['email', 'name']
  },
  admin: {
    read: ['status'],
    write: ['status'],
    //create: true
  },
  owner: {
    read: ['status'],
    write: ['email', 'name', 'phone', '_id'],
    //remove: true
  }
};
 
userSchema.plugin(authz);
 
module.exports = mongoose.model('users', userSchema);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//module.exports = router;
