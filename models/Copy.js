var keystone = require('keystone'), Types = keystone.Field.Types;
var Copy = new keystone.List('Copy', { nocreate: true,nodelete: true });
Copy.add({
  header_h1: {type: Types.Textarea, required: false },
  header_h3: {type: Types.Textarea, required: false },
  header_button: {type: Types.Textarea, required: false }
});
Copy.register();