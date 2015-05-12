gulp           = require 'gulp'
stylus         = require 'gulp-stylus'
watch          = require 'gulp-watch'
nib            = require 'nib'
jeet           = require 'jeet'
rupture        = require 'rupture'
sourcemaps     = require 'gulp-sourcemaps'
browsersync    = require('browser-sync')
nodemon        = require 'gulp-nodemon'
source         = require 'vinyl-source-stream'
buffer         = require 'vinyl-buffer'
gutil          = require 'gulp-util'
assign         = require 'lodash.assign'
watchify       = require 'watchify'
browserify     = require 'browserify'
gulp_browerify = require 'gulp-browserify'
reload         = browsersync.reload
uglify         = require 'gulp-uglify'

require('dotenv').load(silent: true)

bundle = (filenames) ->
  b.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('client.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  #.pipe(babel())
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
gulp.task 'css', ->
  console.log('css!!!')
  gulp.src('./css/app.styl')
  .pipe stylus(use: [nib(), jeet(), rupture()], compress: on, sourcemap: {inline: on, sourceRoot: '../../css'})
  .pipe gulp.dest('./public/styles')
  .pipe reload(stream: yes)

gulp.task 'nodemon', ->
  nodemon
    script: 'keystone.js'
    port: 4500
    ext: 'js html'
    env: 'NODE_ENV': 'development'

##gulp.task('browser-sync')

### Auto-reload
gulp.task 'nodemon', (next) ->
  nodemon(script: 'keystone.js', watch: ['keystone.js'], port:3210)
  .on 'restart', -> console.log 'server:restarted'; reload()
  .once 'start', -> setTimeout next, 2000

gulp.task 'server', ['nodemon'], ->
  browsersync
    notify: no
    ghostMode: no
    proxy: 'http://localhost:3001'
    port: 3000
###

# Default gulp task to run
gulp.task 'default', ['stylus', 'watch', 'assets','nodemon']
gulp.task 'stylus',  ['css']
gulp.task 'watch',   ['watchTemplates', 'watchAssets', 'watchStylus','frontend-js']
gulp.task 'server',  ['stylus', 'watch', 'assets','server','nodemon']
gulp.task 'build', ['stylus','assets','js-build','js-build-admin']

#
# * Create variables for our project paths so we can change in one place *
#

paths = src: [
  './models/**/*.js'
  './routes/**/*.js'
  'keystone.js'
  'package.json'
]

gulp.task 'watchAssets', ->
  gulp.watch './assets/**/*', ['assets']

gulp.task 'assets', ->
  gulp.src('./assets/**/*')
  .pipe gulp.dest('public')

gulp.task 'watchStylus', ->
  gulp.watch './css/**/*.styl', ['css']

gulp.task 'watchTemplates', ->
  gulp.watch './templates/**/*.jade', reload
