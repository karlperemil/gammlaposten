var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  image: { type: Types.CloudinaryImage },
  content: { type: Types.Html, wysiwyg: true, height: 400 }
});

Post.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, quote|30%, state|20%, author|20%, publishedDate|20%';
Post.register();
