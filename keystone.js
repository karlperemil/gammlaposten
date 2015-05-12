// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();
require('coffee-script/register');
var throng = require('throng');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
function start() {

  // Require keystone
  var keystone = require('keystone');

  var mandrill = require('mandrill-api/mandrill');
  var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL);

  if(process.env.NODE_ENV != 'dev' && process.env.NODE_ENV != 'development'){
    bugsnag = require("bugsnag");
    bugsnag.register("0104eda0c01d89cc0beae8761a1001f3");
  }

  keystone.init({
    'name': 'Vision',
    'brand': 'FramSoc',
    'port': process.env.PORT || 3001,
    'less': 'public',
    'static': 'public',
    'static options': { maxAge: 86400000 },
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'jade',
    'mongo': process.env.MONGOHQ_URL || 'mongodb://localhost/vision-framsoc-2/',
    'auto update': true,
    'session': true,
    'auth': true,
    'compress': true,
    'user model': 'Users',
    'session store': 'mongo',
    'wysiwyg additional buttons': 'blockquote',
    'wysiwyg importcss': '/css/admin.css',
    'cookie secret': '}|tpROqg~r1c:Axn&zhFFhIeRt6tZUwHTp7Z;i4_RVGwgk`a+&[g[oVH6xSsT;0d',
    'cloudinary config': {
      'cloud_name': process.env.CLOUDINARY_NAME,
      'api_key': process.env.CLOUDINARY_KEY,
      'api_secret': process.env.CLOUDINARY_SECRET
    }

  });


  // Load your project's Models

  keystone.import('models');

  // Setup common locals for your templates. The following are required for the
  // bundled templates and layouts. Any runtime locals (that should be set uniquely
  // for each request) should be added to ./routes/middleware.js

  keystone.set('locals', {
    _: require('underscore'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
  });

  // Load your project's Routes

  keystone.set('routes', require('./routes'));

  // Setup common locals for your emails. The following are required by Keystone's
  // default email templates, you may remove them if you're using your own.

  // Configure the navigation bar in Keystone's Admin UI

  keystone.set('nav', {
    'Berättelser': 'posts',
    'Sidor': 'pages',
    'Puffar': 'puffs',
    'Copy': 'copies'
  });

  // Start Keystone to connect to your database and initialise the web server

  keystone.start();

};

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});
