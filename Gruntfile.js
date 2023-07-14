module.exports = function (grunt) {
    // Load the Grunt plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-cwebp');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.initConfig({
      sass: {
        options: {
          implementation: require('node-sass'),
          outputStyle: 'expanded',
        },
        dist: {
          files: {
            'dist/css/main.css': 'src/scss/main.scss',
          },
        },
      },
      autoprefixer: {
        options: {
          browsers: ['last 2 versions'],
        },
        dist: {
          src: 'dist/css/main.css',
        },
      },
      cssmin: {
        dist: {
          files: {
            'dist/css/main.min.css': ['dist/css/main.css'],
          },
        },
      },
      
      concat: {
        libraries: {
          src: [
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'src/js/plugins/*.js',
          ],
          dest: 'dist/js/libraries.js',
        },
      },
      uglify: {
        libraries: {
          src: 'dist/js/libraries.js',
          dest: 'dist/js/libraries.min.js',
        },
        scripts: {
          src: 'src/js/scripts.js',
          dest: 'dist/js/scripts.min.js',
        },
      },
      imagemin: {
        dynamic: {
          options:{
            optimizationLevel: 5,
          },
          files: [
            {
              expand: true,
              cwd: 'src/img/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'dist/img/',
            },
          ],
        },
      },
      cwebp: {
        dynamic: {
          options: {
            q: 80, // Quality parameter (0 to 100)
          },
          files: [
            {
              expand: true,
              cwd: 'src/img/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'dist/img/webp/',
              ext: '.webp', // Specify the file extension for converted images
            },
          ],
        },
      },
      browserSync: {
        bsFiles: {
          src: ['dist/css/**/*.css', 'dist/js/**/*.js', '*.html'],
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './',
          },
        },
      },
      notify: {
        sass: {
          options: {
            message: 'SCSS compiled!',
            sound: 'Pop',
          },
        },
        plugins: {
          options: {
            message: 'Plugins concatenated and minified!',
            sound: 'Pop',
          },
        },
        scripts: {
          options: {
            message: 'Scripts minified!',
            sound: 'Pop',
          },
        },
        images: {
          options: {
            message: 'Images optimized and converted to WebP!',
            sound: 'Pop',
          },
        },
      },
      rename: {
        minify: {
          src: 'dist/css/main.css',
          dest: 'dist/css/main.min.css',
        },
      },

      watch: {
        css: {
          files: ['src/scss/**/*.scss'],
          tasks: ['css'],
        },
        js: {
          files: ['src/js/**/*.js'],
          tasks: ['scripts'],
        },
        images: {
          files: ['src/img/**/*.{png,jpg,gif}'],
          tasks: ['imagemin', 'cwebp', 'notify:images'],
        },
        html: {
          files: ['*.html'],
          options: {
            livereload: true,
          },
        },
      },
      


    });
  
    // Register the Grunt tasks
    grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('plugins', ['concat:libraries', 'uglify:libraries', 'notify:plugins']);
    grunt.registerTask('scripts', ['uglify:scripts', 'notify:scripts']);
    grunt.registerTask('images', ['imagemin', 'cwebp', 'notify:images']);
    grunt.registerTask('default', ['css', 'plugins', 'scripts', 'images', 'browserSync', 'watch']);
  };
  