var ezform = require('./modules/ezform.js');
var $ = require('jquery');
var helper = require('./modules/helpers/helper.js');
var tracking = require('./modules/tracking.js');
helper.init();

$(document).ready(function() {
  $.ajaxSetup({ cache: true });

  tracking.init();

  $('.puff-container').click(function(){
    var link = $(this).attr('link-class');
    if(link != 'none'){
      window.location.href = link;
    }
  });

  //Signup/Index form

  var signupdata = {};
  var ambassadordata = {};
  var questiondata = {};
  var sharedata = {};
  var emailField = {el: '#form-email', validate:['email'], errorfield:'#signup-email-error', nolabel:false,name:'email'}
  var fields = [emailField];
  var form = {
    fields: fields,
    button: '#form-send',
    posturl: '/signup',
    send: function(signup){
      // any pre post actions, gives signupdata, should return modified signup data
      signup.signup.member = $('#form-checkbox').prop('checked');
      this.signupdata = signup;
      $('.spinner').show();
      ga('send','event','button','signup', 'signup - send');
      return signup;
    }.bind(this),
    success: function(){
      $('.spinner').hide();
      ga('send','event','button','signup', 'signup - success');
      document.cookie =  "email=" + this.signupdata.signup.email;
      document.cookie = "signedup=true";
      window.location.href = '/ambassador'
    }.bind(this),
    error: function(){
      $('.spinner').hide();
      ga('send','event','button','signup', 'signup - error');
    }
  };
  ezform.addForm(form);

  //Ambassador form

  emailField = {el: '#ambassador-email', validate:['email'], errorfield:'#ambassador-email-error', nolabel:false,name:'email'};
  var phonefield = {el: '#ambassador-phone', validate:[], errorfield:'#ambassador-phone-error', nolabel:false,name:'phone'};
  fields = [emailField,phonefield];
  form = {
    fields: fields,
    button: '#ambassador-send',
    posturl: '/ambassador',
    send: function(signup){
      // any pre post actions, gives signupdata, should return modified signup data
      signup.signup.member = $('#ambassador-checkbox').prop('checked');
      this.ambassadordata = signup;
      ga('send','event','button','ambassador', 'ambassador signup - send');
      return signup;
    }.bind(this),
    success: function(){
      $('.ambassador-wrapper').children().each(function(){
        if($(this).attr('class') !== 'ambassador-thanks'){  
          $(this).animate({opacity:0},200);
        }
      });
      $('.ambassador-thanks').css({opacity:0,display:'inherit'}).delay(200).animate({opacity:1},200);
      document.cookie =  "email=" + this.ambassadordata.signup.email;
      document.cookie =  "phone=" + this.ambassadordata.signup.phone;
      ga('send','event','button','ambassador', 'ambassador signup - success');
      $('#ambassador-send').text('Tack!')
    }.bind(this),
    error: function(){
      $('#ambassador-send').text('Något gick fel, vänligen ladda om sidan och försök igen')
      ga('send','event','button','ambassador', 'ambassador signup - error');
    }
  };
  ezform.addForm(form);

  //Story form
  var storyField = {el: '#story-story', validate:['not-null'], errorfield:'#story-story-error', nolabel:false,name:'content'};
  emailField = {el: '#story-email', validate:['email'], errorfield:'#story-email-error', nolabel:false,name:'email'};
  phonefield = {el: '#story-phone', validate:[''], errorfield:'#story-phone-error', nolabel:false,name:'phone'};
  contentField = {el: '#story-form-story', validate:[''], errorfield:'#story-story-error', nolabel:false,name:'content'};
  fields = [storyField,emailField,phonefield,contentField];
  form = {
    fields: fields,
    button: '#story-send',
    posturl: '/story',
    send: function(signup){
      // any pre post actions, gives signupdata, should return modified signup data
      signup.signup.member = $('#story-checkbox').prop('checked');
      this.sharedata = signup;
      $('.spinner').show();
      $('#story-send').hide();
      ga('send','event','button','story', 'story signup - send');
      return signup;
    }.bind(this),
    success: function(){
      $('.story').find('.wrapper').css('position','relative').children().each(function(){
        console.log($(this).attr('class') )
        if($(this).attr('class') !== 'story-thanks'){  
          $(this).animate({opacity:0},200);
        }
      });
      $('.story-thanks').css({opacity:0,display:'inherit'}).delay(200).animate({opacity:1},200);
      ga('send','event','button','story', 'story signup - success');
      document.cookie =  "email=" + this.sharedata.signup.email;
      document.cookie =  "phone=" + this.sharedata.signup.phone;
    }.bind(this),
    error: function(){
      $('#story-send').show().text('Något gick fel, ladda om sidan och försök igen');
      ga('send','event','button','story', 'story signup - error');
    }
  };
  ezform.addForm(form);

  // question/help form
  storyField = {el: '#question-story', validate:['not-null'], errorfield:'#question-story-error', nolabel:false,name:'content'};
  emailField = {el: '#question-email', validate:['email'], errorfield:'#question-email-error', nolabel:false,name:'email'};
  phonefield = {el: '#question-phone', validate:[''], errorfield:'#question-phone-error', nolabel:false,name:'phone'};
  fields = [storyField,emailField,phonefield];
  form = {
    fields: fields,
    button: '#question-send',
    posturl: '/helps',
    send: function(signup){
      // any pre post actions, gives signupdata, should return modified signup data
      signup.signup.member = $('#question-checkbox').prop('checked');
      this.questiondata = signup;
      $('#question-send').hide();
      ga('send','event','button','question', 'question signup - send');
      return signup;
    }.bind(this),
    success: function(){
      $('.question-fields').css('position','relative').children().each(function(){
        console.log($(this).attr('class') )
        if($(this).attr('class') !== 'question-thanks'){  
          $(this).animate({opacity:0},200);
        }
      });
      $('.question-thanks').css({opacity:0,display:'inherit'}).delay(200).animate({opacity:1},200);
      ga('send','event','button','question', 'question signup - success');
      document.cookie =  "email=" + this.questiondata.signup.email;
      document.cookie =  "phone=" + this.questiondata.signup.phone;
    }.bind(this),
    error: function(){
      $('#question-send').show().text('Något gick fel, ladda om sidan och försök igen');
      ga('send','event','button','question', 'question signup - error');
    }
  };
  ezform.addForm(form);

  $('.membership-form').find('input').keyup(function(){
    console.log($(this).val());
    if($(this).val() != ''){
      $(this).parent().find('span').fadeIn();
    }
    else {
      $(this).parent().find('span').fadeOut();
    }
  });

  $('#insta-load').click(function(){
    $('.insta-link').removeClass('hidden');
    $(this).hide();
    ga('send','event','button','instagram', 'instagram - load more images');
  });

  $('.insta-link').click(function(){
    ga('send','event','button','instagram', 'instagram - click image');
  });
});
