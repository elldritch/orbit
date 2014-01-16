'use strict';

// Module dependencies.
var passport = require('passport')
  , localStrategy = require('passport-local').Strategy;

// Configure very basic Passport authentication strategy.
passport.use(new localStrategy(function(username, password, done){
  if(username == 'bob' && password == 'smith'){
    return done(null, {user: 'bob'});
  }
  done(null, false, {message: 'incorrect credentials'});
}));

// Expose configured Passport instance.
module.exports = passport;
