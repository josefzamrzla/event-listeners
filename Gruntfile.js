module.exports = function(grunt) {
    // tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // configuration
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.description %>\n' +
                ' * @version v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */'
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', 'src/events.js'],
                dest: 'dist/events.js'
            }
        },
        clean: {
            build: ['dist/']
        },
        uglify: {
            // Specify mangle: false to prevent changes to your variable and function names.
            options: {
                mangle: true
            },          
            dist: {
              files: {
                      'dist/events.min.js': ['dist/events.js']
              }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/events.js']
        }

    });

    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify']);
    //grunt.registerTask('devel', ['karma', 'watch']);
};
