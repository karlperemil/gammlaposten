var MediumEditor = require('medium-editor');
var help = require('./helpers/helper.js');

exports = module.exports = {

  copyFromBackend: {},
  newCopy: {},

  init: function(){
    console.log('act copy - init');
    this.listeners();
    this.getCopyFromBackend();
  },

  listeners: function(){
    $('#actcopy-save').click(this.onClickSave.bind(this));
  },

  onClickSave: function(){
    var pass = window.prompt('enter password');
    console.log('trying to save copy to backend...');
    console.log(this);
    this.postNewCopyToBackend(pass);
  },

  addEditClassToDom: function(){
    console.log('addEditClassToDom');
    for(var key in this.copyFromBackend){
      console.log(key);
      var query = "[data-id='" + key + "']";
      $(query).addClass('is-editable');
    }

    var editor = new MediumEditor('.is-editable',
      {
        buttons: ['bold', 'italic','underline'],
        disableReturn: true,
        paste: {
          disableReturn: true,
          forcePlainText: true,
          cleanPastedHTML: true,
          cleanTags: ['p']
        },
      });
  },

  parseChangedCopy: function(){
    for(var key in this.copyFromBackend){
      var query = "[data-id='" + key + "']";
      var newText = $(query).html();
      this.newCopy[key] = newText;
    }
  },

  postNewCopyToBackend: function(password){
    this.parseChangedCopy();
    var postObject = {password: password, copy: this.newCopy};
    $.ajax({
      url: '/copy',
      method: 'post',
      data: postObject,
      success: this.onPostCopySuccess.bind(this),
      error: this.onPostCopyError.bind(this)
    });
  },

  onPostCopyError: function(e){
    console.log('Act Copy - Post - Error');
    console.log(e);
    alert('Något gick fel när copy skulle sparas');
  },

  onPostCopySuccess: function(){
    console.log('Act Copy - Post - Success');
    alert('Copy Sparad!');
  },

  getCopyFromBackend: function(){
    if(help.exists(window.actcopy).copy){
      this.copyFromBackend =  window.actcopy.copy;
    }
    else {
      $.ajax({
        url: '/copy',
        method: 'get',
        data: {},
        success: this.onGetCopySuccess.bind(this),
        error: this.onGetCopyError.bind(this)
      });
    }
  },

  onGetCopySuccess: function(data){
    console.log('Act Copy - Get - Success');
    this.copyFromBackend = data;
    console.log(data);
    this.addEditClassToDom();
  },
  onGetCopyError: function(e){
    console.log('Act Copy - Get - Error');
    console.log(e);
  }

};
