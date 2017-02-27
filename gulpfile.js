/*global require*/
"use strict";

var gulp = require('gulp'),
	path = require('path'),
	data = require('gulp-data'),
	jade = require('gulp-jade'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
    concat = require('gulp-concat');

/*
* Change directories here
*/
var settings = {
	publicDir: '_site',
	sassDir: 'assets/css',
	cssDir: '_site/assets/css',
    jsDir: 'assets/js',
    jsDest: '_site/assets/js'
};

/**
 * De-caching function for Data files
 */
function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
}

/**
 * Compile .jade files and pass in data from json file
 * matching file name. index.jade - index.jade.json
 */
gulp.task('jade', function () {
	return gulp.src('*.jade')
		.pipe(data(function (file) {
			return requireUncached('./_data/' + path.basename(file.path) + '.json');
		}))
		.pipe(jade())
		.pipe(gulp.dest(settings.publicDir));
});

/**
 * Recompile .jade files and live reload the browser
 */
gulp.task('jade-rebuild', ['jade'], function () {
	browserSync.reload();
});

/**
 * Wait for jade and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'script', 'jade'], function () {
	browserSync({
		server: {
			baseDir: settings.publicDir
		},
		notify: false
	});
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
	return gulp.src(settings.sassDir + '/*.scss')
		.pipe(sass({
			includePaths: [settings.sassDir],
			outputStyle: 'compressed'
		}))
		.on('error', sass.logError)
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest(settings.cssDir))
		.pipe(browserSync.reload({stream: true}));
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('script', function () {
	return gulp.src(settings.jsDir + '/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest(settings.jsDest))
		.pipe(browserSync.reload({stream: true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch .jade files run jade-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch(settings.sassDir + '/**', ['sass']);
	gulp.watch(settings.jsDir + '/**', ['script']);
	gulp.watch(['*.jade', '**/*.jade', '**/*.json'], ['jade-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);
