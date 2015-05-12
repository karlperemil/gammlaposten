gulp           = require 'gulp'
stylus         = require 'gulp-stylus'
watch          = require 'gulp-watch'
nib            = require 'nib'
jeet           = require 'jeet'
rupture        = require 'rupture'
sourcemaps     = require 'gulp-sourcemaps'
nodemon        = require 'gulp-nodemon'
source         = require 'vinyl-source-stream'
buffer         = require 'vinyl-buffer'
gutil          = require 'gulp-util'
assign         = require 'lodash.assign'
watchify       = require 'watchify'
browserify     = require 'browserify'
gulp_browerify = require 'gulp-browserify'
uglify         = require 'gulp-uglify'
babel          = require 'gulp-babel'

require('dotenv').load(silent: true)

bundle = (filenames) ->
  b.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('client.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(babel({compact:false}))
  #.pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/js'))

customOpts = {
  entries: ["./client/client.js"],
  debug: true
}

opts = assign({}, watchify.args, customOpts)
b = watchify(browserify(opts))
gulp.task 'frontend-js', bundle
b.on 'update', bundle
b.on 'log', gutil.log



gulp.task "js-build", ->
  gulp.src("./client/client.js").pipe(gulp_browerify(
    insertGlobals: true
    debug: not gulp.env.production
  ))
  .pipe(uglify())
  .pipe(gulp.dest("./public/js"))

gulp.task "js-build-admin", ->
  gulp.src("./client/admin.js").pipe(gulp_browerify(
    insertGlobals: true
    debug: not gulp.env.production
  ))
  .pipe(uglify())
  .pipe(gulp.dest("./public/js"))



# Get one .styl file and render
gulp.task 'stylus', ->
  gulp.src('./css/app.styl')
  .pipe stylus(use: [nib(), jeet(), rupture()], compress: on, sourcemap: {inline: on, sourceRoot: '../../css'})
  .pipe gulp.dest('./public/styles')

gulp.task 'nodemon', ->
  nodemon
    script: 'keystone.js'
    port: 3001
    ext: 'js html'
    env: 'NODE_ENV': 'development'

# Default gulp task to run
gulp.task 'default', ['stylus','assets', 'watch','nodemon']
gulp.task 'watch',   ['watchTemplates', 'watchAssets', 'watchStylus','frontend-js']
gulp.task 'build', ['stylus','assets','js-build','js-build-admin']

gulp.task 'watchAssets', ->
  gulp.watch './assets/**/*', ['assets']

gulp.task 'assets', ->
  gulp.src('./assets/**/*')
  .pipe gulp.dest('public')

gulp.task 'watchStylus', ->
  gulp.watch './css/**/*.styl', ['stylus']

gulp.task 'watchTemplates', ->
  gulp.watch './templates/**/*.jade'
