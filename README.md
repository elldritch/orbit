# Orbit

[![Build Status](https://travis-ci.org/The2ndOne3/orbit.png?branch=master)](https://travis-ci.org/The2ndOne3/orbit)
[![NPM version](https://badge.fury.io/js/generator-orbit.png)](http://badge.fury.io/js/generator-orbit)

Orbit is a loosely coupled framework that minimises black magic usage. Finally, an MVC framework that isn't brain surgery.

## Philosophy
Sometimes, opinionated stacks are good. Boilerplates, scaffolding, and best practice structuring are all very helpful. But what if you only want part of a framework? What if you agree with socket wrapping but not policy-based authentication? What if you want Jade instead of Dust, or vice versa? Pulling out just the pieces you want usually requires several hours of learning how a deeply connected framework works, trying to make sense of poorly documented black magic.

Not so with Orbit. Loosely coupled, but still opinionated. Well-documented, familiar, and easy-to-navigate inner workings. Want to use a different module? Just swap middleware and you're good to go.

## Installation
Orbit is packaged as a Yeoman generator. To install, run `npm -g install yo generator-orbit` and run `yo orbit` to start a project.

## Usage
### Package Management
Client-side components are handled by `bower install`, which installs into `public/components`. Server-side components are handled by `npm install` into `node_modules`.

### Server Daemon
`npm start` will call `nodemon app.js` on port 8000. Don't like `nodemon`? Try `forever`. Need programmatic daemon control? Try writing a `daemon.js` instead using `forever-monitor`, then setting `npm start` to `node daemon.js`.

### Server Middleware
Orbit's server is a standard Express stack. It takes all standard Connect-compatible middlewares. Here's the default stack:
* [Blade](https://github.com/bminer/node-blade) for view engine
* [Helmet](https://github.com/evilpacket/helmet) for security
* [Enrouten](https://github.com/paypal/express-enrouten) for routing
* [Stylus](https://github.com/learnboost/stylus) + [Nib](https://github.com/visionmedia/nib) for CSS preprocessing
* Automatic view rendering
* 404 and 500 pages under 'errors' view folder

### Routing
Orbit uses `express-enrouten` as its default routing engine. Enrouten scans the `controllers` directory for any modules that export a function of the signature `function(app){ ... }` and passes them the Express app. Within each controller, you can then declare an arbitrary amount of routes using `app.get` as usual. See Enrouten's documentation for more details.

If a view exists but a route with its name does not, Orbit will automatically attempt to render that view without locals. For example, if only `app.get('/alice', ...)` and `app.get('/bob', ...)` are defined, a request to `/eve` will attempt to `res.render('eve')` before falling back to a 404.

Want resourceful routing? That's basically the same thing as declaring a bunch of routes on different verbs, but Orbit supports it anyway -- just plug in [express-resource](https://github.com/visionmedia/express-resource).

### Templates
Orbit uses `node-blade` as its default client-side and server-side templating solution. Server-side templates are stored in the `views` folder while client-side templates are stored in `public/templates`. See Blade's documentation for more details.

Want to use Jade as your templating language instead? Check out [jade-browser](https://github.com/storify/jade-browser) for client-side rendering and [grunt-contrib-jade](https://github.com/gruntjs/grunt-contrib-jade) if you want precompilation. Server-side rendering works the same as vanilla Express.

### Models
Orbit doesn't come with a default model system, but recommends [Mongoose](https://github.com/LearnBoost/mongoose) for MongoDB databases and [Sequelize](https://github.com/sequelize/sequelize) for SQL databases. Anything that supports Express also supports Orbit right out of the box.

### Testing
Orbit uses [Mocha](https://github.com/visionmedia/mocha) for testing by default, with [Chai](https://github.com/chaijs/chai) as the assertions library and [SuperTest](https://github.com/visionmedia/supertest) for super-agent testing.

Orbit doesn't come with a default client-side JavaScript testing framework, but recommends [Karma](https://github.com/karma-runner/karma) and [PhantomJS](https://github.com/ariya/phantomjs/).

### Deployment
Orbit uses a premade `Gruntfile.js` with the following default tasks:
* `clean`
  * Clean the `.build` folder
* `build`
  * Run `jshint` linting
  * Compile Stylus files
  * Link and optimise RequireJS files if using RequireJS
  * Copy compiled files to `.build`
* `test`
  * Runs Mocha unit tests.

When `NODE_ENV` is set to `production`, Orbit automatically compresses its responses and serves precompiled files from `.build` -- don't forget to `grunt build` beforehand!

## License
Copyright 2013 Lehao Zhang

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
