module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // CONFIG START
    config: {
      assets: 'assets',
      src: 'app',
      dev: '.tmp',
      dist: 'release',
      server: '127.0.0.1',
      port: 9000,
    },

    licensechecker: {
      options: {
        'warn': true,
        'outFile': null,
        'acceptable': [
          'MIT',
          'MIT/X11',
          'BSD',
          'ISC',
          'BSD-3'
        ],
        'include': [
          'dependencies',
          'devDependencies',
          'peerDependencies'
        ]
      }
    },

    clean: {
      dev: ['<%= config.dev %>'],
      dist: ['<%= config.dist %>']
    },

    copy:{
      dev:{
        src: '<%= config.src %>/index.html',
        dest: '<%= config.dev %>/index.html',
        filter: 'isFile'
      },

      dist:{
        src: '<%= config.src %>/index.html',
        dest: '<%= config.dist %>/index.html',
        filter: 'isFile'
      }
    },

    less: {
      dev: {
        'options': {
          'plugins' : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]}) ],
          'compress': true,
          'sourceMap': true,
          'sourceMapFilename': '<%= config.dev %>/css/main.css.map',
          'sourceMapBasepath': '<%= config.dev %>/',
        },
        'files': {
          '<%= config.dev %>/css/main.css': '<%= config.src %>/com/less/main.less'
        },
      },
      dist: {
        'options': {
          'compress': true,
          'cleancss': true,
        },
        'files': {
          '<%= config.dist %>/css/main.css': '<%= config.src %>/com/less/main.less'
        }
      }
    },

    connect: {
      devServer: {
        options: {
          base: '<%= config.dev %>/',
          port: '<%= config.port %>',
          hostname: '<%= config.server %>',
          livereload: true,
          keepalive: true
        }
      }
    },

    browserify: {
      options: {
        transform: ['brfs']
      },
      dev: {
        'src': '<%= config.src %>/index.js',
        'dest': '<%= config.dev %>/js/bundle.js',
        'options': {
          'debug': true,
          'verbose': true,
          'open': true
        }
      },
      dist: {
        'src': '<%= config.src %>/index.js',
        'dest': '<%= config.dist %>/js/bundle.js',
        'options': {
          'debug': false,
          'verbose': false
        }
      },
      // preloader: {
      // 'src': 'src/preloader.js',
      // 'dest': 'app/js/preloader.js',
      // 'options': {
      // 'debug': false,
      // 'verbose': false
      // }
      // }
    },


  // CONFIG END
  });

  grunt.registerTask('default',[
    // 'licensechecker',
    // 'clean:dev',
    // 'copy:dev',
    'less:dev',
    //
    // 'connect',

  ]);
};
