module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		less: {
			build: {
				files: {
					'css/style.css': 'css/style.less'
				}
			}
		},

		ftp_push: {
		    demo: {
		    	options: {
		    		authKey: 'a147049_5',
		    		host: 'a147049.ftp.mchost.ru',
		    		dest: '/httpdocs/csssr/',
		    		port: 21
		    	},
		    	files: [{
		    		expand: true,
		    		cwd: '.',
		    		src: [
		    		      "*.html",
		    		      "css/**",
		    		      "js/**",
		    		      "img/**",
		    		]
		        }]
		    }
		 },

		 autoprefixer: {
		    options: {
		        browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
		    },
		    main: {
		        expand: true,
		        flatten: true,
		        src: 'css/*.css',
		        dest: 'css/'
		    }
		},

		csscomb: {
		  dist: {
		    files: {
		      'css/style.css': ['css/style.css']
		    }
		  }
		},

		imagemin: {
    		options: {
		    optimizationLevel: 3,
		    progressive: true,
		    interlaced: true,
		    pngquant: true
		  },
		  dynamic: {
		    files: [{
		      expand: true,
		      cwd: '/img',
		      src: ['**/*.{png,jpg,gif}'],
		      dest: '/img'
		    }]
		  }
		},

		uglify: {
		    build: {
		        cwd: 'js/',
		        src: ['**/*.js'],
		        dest: 'js/build/*.min.js'
		    }
		},

		jade: {
		  debug: {
		    options: {
		      data: {
		        debug: false,
		      }
		    },
		    files: {
		      "index.html": "index.jade"
		    }
		  }
		},

		watch: {
		    // scripts: {
		    //     files: ['js/*.js'],
		    //     tasks: ['uglify'],
		    //     options: {
		    //         spawn: false,
		    //     },
		    // },
		    html: {
		    	files: ['*.jade'],
		    	tasks: ['jade', 'watch'],
		    	options: {
			        spawn: false,
			        event: ['all'],
			    }
		    },

			css: {
			    files: ['css/style.less', '*.html'],
			    tasks: ['less', 'autoprefixer', 'csscomb', 'watch'],
			    options: {
			        spawn: false,
			        event: ['all'],
			    }
			},

			img:{
				files: ['img/*.{png,jpg,gif}'],
				tasks: ['imagemin', 'watch'],
				options: {
			        spawn: false,
			        event: ['all'],
			    }
			}
		},

});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-ftp-push');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-contrib-jade');

	grunt.registerTask('default', ['jade', 'less', 'ftp_push', 'imagemin', 'uglify', 'watch', 'autoprefixer', 'csscomb']);
	grunt.registerTask('start', ['less', 'contrib-jade']);

};
