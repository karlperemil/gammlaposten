var ezform = require('./modules/ezform.js');
var $ = require('jquery');
var helper = require('./modules/helpers/helper.js');
var tracking = require('./modules/tracking.js');
helper.init();

$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  console.log('init');
  $(window).scroll(function(){
    console.log('scrolling');
    var topHeight = $('.header-bg').first().height() - $('.menu').first().height();
    if($(this).scrollTop() >= topHeight){
      $('.menu').removeClass('is-transparent');
    }
    else {
      $('.menu').addClass('is-transparent');
    }
  });
});
