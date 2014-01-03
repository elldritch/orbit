# Orbit
Orbit is a loosely coupled framework that minimises black magic usage. Finally, a framework that's not brain surgery.

## Philosophy
Sometimes, opinionated stacks are good. Boilerplates, scaffolding, and best practice structuring are all very helpful. But what if I only want part of a framework? What if I agree with socket wrapping but not policy-based authentication? What if I want Jade instead of Dust, or vice versa? Pulling out just the pieces you want usually requires several hours of learning how a deeply connected framework works, trying to make sense of poorly documented black magic.

Not so with Orbit. Loosely coupled, but still opinionated. Well-documented, familiar, and easy-to-navigate inner workings. Want to use a different module? Just swap middleware and you're good to go.

## Installation
Orbit is still under development. To use the current scaffold, `git clone` the repository and start working.

## Usage
### Package Management
Client-side components are handled by `bower install`, which installs into `public/components`. Server-side components are handled by `npm install` into `node_modules`.

### Server Daemon
`npm start` will call `nodemon app.js` on port 8000. Don't like `nodemon`? Try `forever`. Need programmatic daemon control? Try writing a `daemon.js` instead using `forever-monitor`, then setting `npm start` to `node daemon.js`.

### Server Middleware
Orbit's server is a standard Express stack. It takes all standard Express-compatible middlewares. Here's the default stack:
* Blade for view engine
* Helmet for security
* Enrouten for routing
* Stylus+Nib for CSS preprocessing
* 404 and 500 pages under 'errors' view folder.

### Routing
Orbit uses `express-enrouten` as its default routing engine.

### Templates
Orbit uses `node-blade` as its default client-side and server-side templating solution. Server-side templates are stored in the `views` folder while client-side templates are stored in `public/templates`.

### Models
Orbit doesn't come with a default model system, but recommends `mongoose` for MongoDB databases and `sequelize` for SQL databases.

### Testing
Orbit uses `mocha` for testing by default, with `chai` as the assertions library and `supertest` for superagent testing.

### Deployment
Orbit uses a premade `Gruntfile.js` with the following default tasks:
* clean
* build
  * Run jshint
  * Compile Jade templates
  * Compile Stylus files
  * Link and optimise RequireJS files
  * Copy compiled files to `.build`
* test
  * Runs Mocha unit tests.

When `NODE_ENV` is set to `production`, Orbit automatically compresses its responses and serves precompiled files from `.build`.

## License
&copy; 2013 Lehao Zhang.
Released under the Apache License 2.0.
