module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        files: {
          './bin/MarketGraph.js': './src/**/*.js',
        }
      }
    },

    uglify: {
      dist: {
        files: {
          './bin/MarketGraph.min.js': './bin/MarketGraph.js'
        }
      }
    },

    watch: {
      options: {
        livereload: 35729
      },
      js: {
        files: './src/**/*.js',
        tasks: ['concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify', 'watch']);
}
