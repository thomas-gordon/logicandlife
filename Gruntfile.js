module.exports = function (grunt) {

	require('jit-grunt')(grunt, {
		bower: 'grunt-bower-install-simple',
        sftp: 'grunt-ssh'
	});

	grunt.initConfig({
        sass: {
            develop: {
                options: {
                    sourceMap: true
                },
                files: {
                    './_site/css/style.css': './sass/style.scss'
                }
            },
            production: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    './_site/css/style.css': './sass/style.scss'
                }
            }
        },

        concurrent: {
            target: ['watch', 'connect'],
            options: {
                logConcurrentOutput: true
            }
        },
        shell: {
            jekyll: {
                command: 'jekyll build; grunt sass:develop',
                stdout: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '_site/',
                    livereload: true
                }
            }
        },
        watch: {


            html: {
                files: [
                    '*.html',
                    '!_site/**/*.html',
                    '*.yml',
                    'js/**.js',
                    '!_site/**/*.js',
                    '_posts/**',
                    '_includes/**'
                ],
                tasks: 'shell:jekyll'
            },

            sass: {
                files: [
                    './sass/**/*.scss',
                    '!_site/sass/**/*.scss'
                ],
                tasks: ['sass:develop']
            },
            css: {
                options:{
                    livereload:true
                },
                files: ['./_site/css/style.css'],
                tasks: []
            }
        }
	});

    grunt.registerTask('default', [], function () {
        grunt.task.run(
            'shell:jekyll',
            'connect:server',
            'watch'
        );
    });

};