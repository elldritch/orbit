'use strict';

// Grab the model from this file.
// This is NOT a naming convention -- name things whatever you want.
var IndexModel = require('../models/index');

// Export an Enrouten controller.
module.exports = function (app) {
  var model = new IndexModel();

  // Render this template using the model object's data on a GET to '/'.
  app.get('/', function (req, res) {
    res.render('index', model);
  });
};
