'use strict';

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import autoprefixer from 'autoprefixer';
import minimist from 'minimist';
import wrench from 'wrench';
import runSequence from 'run-sequence';

const fs = require('fs');
const yaml = require("js-yaml");
const load = yaml.load(fs.readFileSync("./k-task/config.yml"));

// Global
const plugins = gulpLoadPlugins();

// Create karma server
const KarmaServer = require('karma').Server;

// Create a new browserSync

const defaultNotification = function(err) {
    return {
        subtitle: err.plugin,
        message: err.message,
        sound: 'Funk',
        onLast: true,
    };
};

// Call Config
let config = Object.assign({}, load.config, defaultNotification);

// Call ENV
let setgulp = minimist(process.argv.slice(2));

let target = setgulp.production ? config.dest : config.tmp;

let browserSync = browserSyncLib.create();
// Load Gulp tasks folder
wrench.readdirSyncRecursive('./k-task/task/gulp').filter((file) => {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./k-task/task/gulp/' + file)(gulp, setgulp, plugins, config, target, browserSync);
});

// Default task
gulp.task('default', ['clean'], () => {
    gulp.start('k-task');
});

gulp.task('test', ['clean'], () => {
    gulp.start('testing');
});

gulp.task('serve', ['clean'], () => {
    gulp.start('ser');
});

gulp.task('server', ['clean'], () => {
    gulp.start('ser');
});

// Build task
gulp.task('build', ['cleanall'], () => {
    gulp.start('product');
});
gulp.task('build-local', ['cleanall'], () => {
    gulp.start('product-local');
});
gulp.task('build-no', ['cleanall'], () => {
    gulp.start('product-no');
});
gulp.task('build-local-no', ['cleanall'], () => {
    gulp.start('product-local-no');
});


// Basic production-ready code
gulp.task('k-task', function(cb) {
    runSequence(
        'sass', // css, less, stylus
        'concat',
        'babel',
        'babel-concat',
        'pug', // hamber, ejs, pug
        'copy',
        // 'copyeditor',
        'fonts',
        cb
    );
});

gulp.task('ser', function(cb) {
    runSequence(
        'k-task',
        'inject',
        'browserSync',
        'watch',
        cb
    );
});


// Rebuild will call by browserify
gulp.task('product', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'cssmin',
        'uglify',
        'csscomb',
        'tobase64',
        'rev',
        'delete-css',
        'delete-js',
        'revreplace',
        'sitemap',
        'htmlmin',
        'imagemin',
        'header',
        'water-mark',
        'cleanup',
        'cleanup-js',
        'cleanup-css',
        'browserSync',
        'done',
        cb
    );
});

// Rebuild will call by browserify
gulp.task('product-no', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'csscomb',
        'tobase64',
        'inject',
        'sitemap',
        'htmlmin',
        'imagemin',
        'remove-comment-css',
        'remove-comment-js',
        'html-beautify',
        'header',
        'cleanup',
        'browserSync',
        'done',
        cb
    );
});

// Not min & can run without localhost
gulp.task('product-local', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'cssmin',
        'uglify',
        'csscomb',
        'tobase64',
        'rev',
        'delete-css',
        'delete-js',
        'revreplace',
        'sitemap',
        'htmlmin',
        'imagemin',
        'header',
        'cleanup',
        'cleanup-js',
        'cleanup-css',
        'local-run',
        'local-run-doc',
        'local-run-home',
        'browserSync',
        'done',
        cb
    );
});

// Not min & can run without localhost
gulp.task('product-local-no', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'csscomb',
        'tobase64',
        'inject',
        'sitemap',
        'htmlmin',
        'imagemin',
        'remove-comment-css',
        'remove-comment-js',
        'html-beautify',
        'header',
        'cleanup',
        'local-run',
        'local-run-doc',
        'local-run-home',
        'browserSync',
        'done',
        cb
    );
});


// Testing
gulp.task('testing', (done) => {
    new KarmaServer({
        configFile: path.join(__dirname, '/k-task/karma.conf.js'),
        singleRun: !setgulp.watch,
        autoWatch: setgulp.watch
    }, done).start();
});