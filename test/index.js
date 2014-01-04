/*global describe:false, it:false, before:false, beforeEach:false, after:false, afterEach:false*/

'use strict';

var server = require('../server'),
  request = require('supertest'),
  assert = require('assert');

describe('index', function () {
  var mock;

  beforeEach(function (done) {
    server(function(server){
      mock = server;
      done();
    });
  });


  afterEach(function (done) {
    mock.close(done);
  });


  it('should connect to index', function (done) {
    request(mock)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/.*?Welcome to application-name.*? /)
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        done();
      });
  });

});