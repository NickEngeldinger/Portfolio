var gulp     = require('gulp'),
	jshint   = require('gulp-jshint'),
	concat   = require('gulp-concat'),
	uglify   = require('gulp-uglify'),
	rename   = require('gulp-rename'),
	svgstore = require('gulp-svgstore'),
	svgmin   = require('gulp-svgmin'),
	inject   = require('gulp-inject');

gulp.task('lint', function() {
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
	return gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('svg', function() {
	var svgs = gulp.src('svg/*.svg')
					.pipe(svgstore({ 
						prefix: 'icon-', 
						inlineSvg: true,
						transformSvg: function(svg, cb) {
							svg.find('path').removeAttr('style'); 
							svg.attr('style', 'display: none');
							cb(null, svg);
						} 
					}))
	function fileContents(filepath, file) {
		return file.contents.toString('utf8')
	}
	return gulp.src('index.html')
		.pipe(inject(svgs, { transform: fileContents }))		
		.pipe(gulp.dest('svgbuild'))
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch('svg/*.svg', ['svg']);
});

gulp.task('default', ['lint', 'scripts', 'svg', 'watch']);