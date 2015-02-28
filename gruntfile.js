module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 9000,
					base: 'public',
					livereload: true
				}
			}
		},

		concat: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyy-mm-dd") %> */',
				separator: ';',
				sourceMap: true,
				stripBanners: true
			},
			dist: {
				src: [
					'source/scripts/scripts.js',
				],
				dest: 'public/scripts.min.js'
			}
		},

		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: true
					}
				},
				files: [{
					expand: true,
					cwd: 'source',
					src: ['*.jade'],
					dest: 'public',
					ext: '.html'
				}]
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					require: 'susy'
				},
				files: {
					'public/styles/styles.css': 'source/styles/screen.scss'
				}
			}
		},

		uglify: {
			options: {
				mangle: false, // Don't alter variable or function names in affected js files
				sourceMap: true,
				beautify: true,
			},
			my_target: {
				files: [{
					expand: true,
					cwd: 'source/scripts/',
					src: ['*.js', '!*.min.js'],
					dest: 'public/scripts/',
					ext: '.min.js'
				}]
			}
		},

		watch: {
			jade: {
				files: ['source/**/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['source/styles/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},
			uglify: {
				files: ['source/scripts/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['watch']);

	// Start web server
	grunt.registerTask('serve', [
		'connect:server',
		'watch'
	]);
};
