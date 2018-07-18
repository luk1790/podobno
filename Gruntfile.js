module.exports = function(grunt) {
	var appVersion = grunt.option("app-version");

	var deployPath = 'public_html/podobno/';
    var deployServer = 's55.hekko.pl';
    var deployAuthKey = 'podobnoAuth';


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			main: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 3,
					cleancss: true,
				},
				files: {
					'css/bootstrap.min.css': 'css/less/bootstrap/bootstrap.less',
					'css/bootstrap-theme.min.css': 'css/less/bootstrap/theme.less',
					'css/main.min.css': 'css/less/main.less',
				}
			},
		},
		watch: {
			files: ['Gruntfile.js', 'css/less/**/*'],
			tasks: ['less']
		},
		'ftp-deploy': {
	      build: {
	        auth: {
	          host: deployServer,
	          port: 21,
	          authKey: deployAuthKey,
	        },
	        src: './',
	        dest: deployPath,
	        exclusions: ['./node_modules', './.git', './Gruntfile.js', './package.json', '.gitignore', '.ftppass', './css/less']
	      }
	    }
	});


	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftp-deploy');

	/* Grunt Tasks */
	grunt.registerTask('deploy', ['less', 'ftp-deploy']);
	grunt.registerTask('default', ['less']);

}