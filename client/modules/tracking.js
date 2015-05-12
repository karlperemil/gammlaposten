var $ = require('jquery');


module.exports = {
  init: function(){
    $('.is-facebook').click(function(){
      ga('send', 'event', 'share facebook');
    });

    $('.is-twitter').click(function(){
      ga('send', 'event', 'share twitter');
    });

    $('.is-mail').click(function(){
      ga('send', 'event', 'share email');
    });

    $('.instagram-holder a').click(function(){
      ga('send', 'event', 'click instagram image');
    });

    $('#member-send').click(function(){
      ga('send', 'event', 'bli medlem formulär - skicka');
    });

    $('.question-pdf-link').click(function(){
      ga('send', 'event', 'berattelse - story pdf download');
    });

    $('.question-pdf-link2').click(function(){
      ga('send', 'event', 'berattelse - brickunderlägg pdf download');
    });
  }
}

