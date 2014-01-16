// All Orbit stack components are written using the strict JavaScript subset.
// If you want to disable the JSHint requirement, modify .jshintrc and comment out "strict": true
'use strict';

// Default stack dependencies.
var express = require('express')
  , path = require('path')

  , enrouten = require('express-enrouten')
  , helmet = require('helmet')

  , blade = require('blade')
  , stylus = require('stylus')
  , nib = require('nib');

// Initialise the Express stack and set the default listening port.
var app = express();
app.set('port', process.env.PORT || 3000);

// Configure the view engine and view directory.
app.set('view engine', 'blade');
app.set('views', path.join(__dirname, 'views'));

// Gzip and deflate responses if run in a production environment.
if('production' == app.get('env')){
  app.use(express.compress());
}

// Use Helmet's default security headers.
helmet.defaults(app);

// Use dev-level logging.
app.use(express.logger('dev'));
// Cache and serve the site's favicon located at 'public/images/favicon.ico'.
app.use(express.favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
// Support JSON and urlencoded responses.
app.use(express.json());
app.use(express.urlencoded());
// Enable support for faux PUT and DELETE requests.
app.use(express.methodOverride());

// Enable Stylus compilation using Nib and compress them.
// Compile all .styl files within the 'public' directory.
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: function (str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
}));

// Use Blade's middleware endpoint that serves client-side templates with a client-side renderer.
// Serve templates located at 'public/templates'.
app.use(blade.middleware(path.join(__dirname, 'public', 'templates')));

// Serve compiled assets from the '.build' directory rather than on-demand assets from the 'public' directory when in production mode.
if('production' == app.get('env')){
  app.use(express.static(path.join(__dirname, '.build')));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Want to use Passport authentication? Just add the following lines to your stack (and add the corresponding package.json modules):
// var auth = require('./lib/auth');
// app.use(express.session({secret: 'the dark is scary :('}));
// app.use(auth.initialization());
// app.use(auth.session());


// Use Enrouten's directory scanning middleware, configured to the 'controllers' directory.
app.use(enrouten({
  directory: 'controllers'
}));
// When controllers are not available, render views by default.
app.use(function(req, res, next){
  try{
    res.render(path.join(app.get('views'), req.url));
  }
  catch(e){
    next();
  }
});

// Set default 404 and 500 pages at 'views/errors/404' and 'views/errors/505' when in production.
// Use the standard Express error handler when in development.
if('production' == app.get('env')){
  app.use(function(err, req, res, next){
    if(err.message.indexOf('Failed to lookup view') != -1 && err.view){
      res.status(404).render('errors/404', {code: 404});
    }
    else{
      console.error('[ORBIT ERR]', err);
      res.status(500).render('errors/500', {code: 500});
    }
  });
} else {
  app.use(express.errorHandler());
}

// Export the server stack.
module.exports = app;
