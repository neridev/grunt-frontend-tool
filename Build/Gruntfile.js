const sass = require('sass');

module.exports = function (grunt) {

    /**
     * Project configuration.
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            root: '../',
            resources: '<%= paths.root %>Resources/',
            sass: '<%= paths.resources %>Public/Scss/',
            css: '<%= paths.resources %>Public/Css/',
            img: '<%= paths.resources %>Public/Images/',
            js: '<%= paths.resources %>Public/JavaScript/'
        },
        banner: '/*!\n' +
            ' * Frontend Tool v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
        uglify: {
            all: {
                options: {
                    banner: '<%= banner %>',
                    mangle: true,
                    compress: true,
                    beautify: false
                },
                files: {
                    "<%= paths.js %>/Dist/scripts.js": [
                        "<%= paths.js %>Src/main.js"
                    ]
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                outputStyle: 'expanded',
                precision: 8,
                sourceMap: false
            },
            layout: {
                files: {
                    '<%= paths.css %>styles.css': '<%= paths.sass %>styles.scss'
                }
            }
        },
        postcss: {
            options: {
                map: false,
            },
            layout: {
                src: '<%= paths.css %>styles.css'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: '*',
                advanced: false
            },
            layout: {
                src: '<%= paths.css %>styles.css',
                dest: '<%= paths.css %>styles.min.css'
            }
        },
        imagemin: {
            extension: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.resources %>',
                    src: [
                        '**/*.{png,jpg,gif}'
                    ],
                    dest: '<%= paths.resources %>'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: '<%= paths.sass %>**/*.scss',
                tasks: ['css']
            },
            javascript: {
                files: '<%= paths.js %>Src/**/*.js',
                tasks: ['js']
            }
        }
    });

    /**
     * Register tasks
    //  */
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');

    /**
     * Grunt update task
     */
    grunt.registerTask('css', ['sass', 'postcss', 'cssmin']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('build', ['js', 'css', 'imagemin']);
    grunt.registerTask('default', ['build']);

};
