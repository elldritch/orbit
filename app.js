'use strict';

/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')

  , enrouten = require('express-enrouten')
  , helmet = require('helmet')

  , blade = require('blade')
  , stylus = require('stylus')
  , nib = require('nib')

  , jadebrowser = require('jade-browser');

var app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'blade');

if('production' == app.get('env')){
  app.use(express.compress());
}

helmet.defaults(app);

app.use(enrouten({
  directory: 'controllers'
}));

app.use(express.logger('dev'));
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: function (str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
}));

app.use(blade.middleware(path.join(__dirname, 'public', 'templates')));

if('production' == app.get('env')){
  app.use(express.static(path.join(__dirname, '.build')));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.use(app.router);

if('production' == app.get('env')){
  app.all('*', function(req, res){
    res
      .status(404)
      .render('errors/404');
  });
  app.use(function(err, req, res, next){
    res
      .status(500)
      .render('errors/500');
  });
} else {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
