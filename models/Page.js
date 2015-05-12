var keystone = require('keystone'),
Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

 var Page = new keystone.List('Page', {
  map: {name: 'title'},
  autokey: { path: 'slug', from: 'title', unique: true}
 });

 Page.add({
  title: {type: String, required: true },
  content: { type: Types.Html, wysiwyg: true, height: 600 }
 });

 Page.register();
