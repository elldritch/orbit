'use strict';

module.exports = function (grunt){
  grunt.initConfig({
    jshint: {
      files: ['controllers/**/*.js', 'lib/**/*.js', 'models/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    requirejs: {
      build: {
        options: {
          baseUrl: 'public/js',
          mainConfigFile: 'public/js/config.js',
          dir: '.build/js',
          optimize: 'uglify',
          modules: [{name: 'app'}]
        }
      }
    },
    stylus: {
      build: {
        options: {
          compress: true,
          paths: ['public/css']
        },
        files: {
          '.build/css/app.css': 'public/css/*.styl'
        }
      }
    },
    jade: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'public/templates/',
            src: '**/*.jade',
            dest: '.build/templates',
            ext: '.js'
          }
        ],
        options: {
          client: true
        }
      }
    },
    copyto: {
      build: {
        files: [
          { cwd: 'public', src: ['**/*'], dest: '.build/' }
        ],
        options: {
          ignore: [
            'public/css/**/*',
            'public/js/**/*',
            'public/templates/**/*'
          ]
        }
      }
    },
    clean: {
      'build': '.build'
    },
    mochacli: {
      src: ['test/*.js'],
      options: {
        globals: ['chai'],
        timeout: 6000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-copy-to');

  grunt.registerTask('default', ['clean', 'build']);
  grunt.registerTask('build', ['jshint', 'jade', 'stylus', 'requirejs', 'copyto']);
  grunt.registerTask('test', ['jshint', 'mochacli']);
};
