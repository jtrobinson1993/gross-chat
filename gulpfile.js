const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const babel = require('gulp-babel');
const minifyJS = require('gulp-uglifyjs');
const minifyCSS = require('gulp-clean-css');
const minifyHTML = require('gulp-cleanhtml');

gulp.task('default', ['less', 'js', 'html']);

gulp.task('less', () => {
	return gulp.src('./app/client/src/styles/styles.less')
						.pipe(less({
							paths: [path.join(__dirname, 'less', 'includes')]
						}))
						.pipe(minifyCSS())
						.pipe(gulp.dest('./app/client/build/styles/'));
});

gulp.task('js', () => {
	return gulp.src(['./app/client/src/scripts/app.js', './app/client/src/scripts/**/*.js'])
						.pipe(concat('app.js'))
						.pipe(babel({
							presets: ['es2015', 'es2016']
						}))
						.pipe(minifyJS())
						.pipe(gulp.dest('./app/client/build/scripts/'));
});

gulp.task('html', () => {
	return gulp.src('./app/client/src/index.html')
						.pipe(minifyHTML())
						.pipe(gulp.dest('./app/client/build/'))
});
