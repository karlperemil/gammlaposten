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
  function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("-link", "");
    var menuHeight = $('.menu').height()
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top - menuHeight + 5},
        500);
  }

  $('.boka-link').click(function(e){
    goToByScroll('boka-link');
  })

  $('.menu a').click(function(e){
    console.log ($(this).attr('id') );
      // Prevent a page reload when a link is pressed
    e.preventDefault(); 
      // Call the scroll function
    goToByScroll($(this).attr("id"));           
  });

  var mapOptions = {
    center: { lat: -34.397, lng: 150.644},
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);
});
