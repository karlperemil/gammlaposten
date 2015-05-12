/*
EXAMPLE

  var namefield = {el:'#signup-forher-name',validate:['not-null'],errorfield:'#signup-forher-error-name',nolabel:true,name:'name'};
  var emailfield = {el:'#signup-forher-email',validate:['email'],errorfield:'#signup-forher-error-email',nolabel:true,name:'email'};
  var mobilefield = {el:'#signup-forher-mobile',validate:['numbers','not-null'],errorfield:'#signup-forher-error-mobile',nolabel:true,name:'mobile'};
  var fields = [namefield,emailfield,mobilefield];
  var ezform = {
    fields: fields,
    button: '#signup-forher-submit',
    posturl: '/signup-forher',
    success: function(){
      $('#signup-forher-success').show();
      $('#signup-forher-error').hide();
    },
    error: function(){
      $('#signup-forher-error').show();
      $('#signup-forher-success').hide();
    }
  };
  document.ezform.addForm(ezform);

validation:
'not-null'
'email'
'numbers'

*/

var $ = require('jquery');

exports = module.exports = {
  forms: [],
  currentForm: 0,
  submitting: false,
  validateEmail: function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validateNotNull: function(name){
    if(name == ""){
      return false;
    }
    return true;
  },
  validateNumbersOnly: function(val){
    var re = /^\d+$/;
    return re.test(val);
  },

  validateFields: function(form) {
    var allValid = true;
    var models = form.models;
    for(var i = 0; i < models.length; i++){
      var model = models[i];
      var valid = true;
      for(var t = 0; t < model.validate.length; t++){
        if(model.validate[t] == 'not-null'){
          if(!this.validateNotNull($(model.el).val())){
            valid = false;
            allValid = false;
          }
        }
        if(model.validate[t] == 'email'){
          if(!this.validateEmail($(model.el).val())){
            valid = false;
            allValid = false;
          }
        }
        if(model.validate[t] == 'numbers'){
          if(!this.validateNumbersOnly($(model.el).val())){
            valid = false;
            allValid = false;
          }
        }
      }

      if(model.nolabel){
        if($(model.el).val() == model.origname){
          valid = false;
          allValid = false;
        }
      }

      if(valid){
        $(model.errorfield).hide();
      }
      else {
        $(model.errorfield).show();
      }
    }

    return allValid;
  },

  findFieldModel: function(id) {
    for(var f = 0; f < this.forms.length; f++){
      var models = this.forms[f].models;
      for(var i = 0; i < models.length; i++){
        if(models[i].el == "#" + id){
          return models[i];
        }
      }
    }
  },

  onClickField: function(e){
    var fieldModel = this.findFieldModel($(e.currentTarget).attr('id'));
    if(fieldModel.nolabel){
      if($(fieldModel.el).val() == fieldModel.origname){
        $(fieldModel.el).val('');
      }
    }
  },

  addFields: function(form){
    var models = form.config.fields;
    for(var i = 0; i < models.length; i++){
      if(!models[i].hasOwnProperty('nolabel')) models[i].nolabel = false;
      if(!models[i].hasOwnProperty('el')) models[i].el = "#" + models[i].name;
      if(!models[i].hasOwnProperty('validate')) models[i].validate = [];
      if(!models[i].hasOwnProperty('errorfield')) models[i].errorfield = "#" + models[i].name + "-error";
      models[i].origname = $(models[i].el).val();
      $(models[i].errorfield).hide();
      $(models[i].el).click(this.onClickField.bind(this));
    }
    form.models = models;
  },

  addForm: function(formConfig){
    var form = {};
    form.models = [];
    form.config = formConfig;
    this.addFields(form);
    this.addMouseListeners(form);
    this.forms.push(form);
  },

  addMouseListeners: function(form){
    $(document).mouseup(function (e){
      var forms = this.forms;
      for(var f = 0; f < forms.length;f++){
        var models = forms[f].models;
        for(var i = 0; i < models.length; i++){
          var $el = $(models[i].el);
          if(models[i].nolabel){
            if(!$el.is(e.target) && $el.has(e.target).length === 0){
              if($el.val() == "") $el.val(models[i].origname);
            }
          }
        }
      }
    }.bind(this));

    $(form.config.button).click(function(){
      if(this.validateFields(form) && !this.submitting){
        this.submitting = true;
        var data = {};
        var models = form.models;
        for(var i = 0; i < models.length; i++){
          data[models[i].name] = $(models[i].el).val();
        }
        var signup = {};
        signup.signup = data;
        var evt = new CustomEvent('EzformPost',{'detail':{'data':data}});
        var elId = form.config.button.slice(1);
        document.getElementById(elId).dispatchEvent(evt);
        signup = form.config.send(signup);
        $.ajax({
        type: "POST",
        url: form.config.posturl,
        data: signup,
        success: function(data,textStatus,jqXHR){
          this.submitting = false;
          form.config.success();
        },
        error: function(data,textStatus,jqXHR){
          this.submitting = false;
          if(data.status == 200){
            form.config.success();
          }
          else{
            form.config.error();
          }
        },
        dataType: 'json'
      });
      }
    }.bind(this));
  }
}