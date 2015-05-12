var keystone = require('keystone');
//var get = require('../../vendor/get');
var http = require('http');
var https = require('https');
var request = require('request');
require('dotenv').load();

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.data = {
    posts: [],
    instagram: []
  };

  var getInstagramData = false;

  var date = new Date();
  var time = date.getTime();

  var lastInstagramFetch = GLOBAL['indexInstagramCache'];
  if(lastInstagramFetch == undefined){
    getInstagramImagesByUser();
  }
  else if(time > lastInstagramFetch.time + (60*60*1000)){
    getInstagramImagesByUser();
  }
  else {
    locals.data.instagram = lastInstagramFetch.data;
    view.render('index');
  }


  function getInstagramImagesByTag(){
    console.log('getInstagramImagesByTag');
    var tag = 'vithelg'
    var clientId = 'd87174328ee747898e3cb64ad6959d41'
    var url = 'https://api.instagram.com/v1/tags/' +tag+ '/media/recent?client_id=' + clientId;

    request(url,function(error,response,body){
      if(error != null){
        console.log('Error:',error);
      }
      else {
        var images = JSON.parse(body);
        locals.data.instagram = images.data;
      }
      getInstagramImagesByUser();
    });
  }

  function getInstagramImagesByUser(){
    console.log('getInstagramImagesByUser');
    var userid = '1909643275'
    var clientid = 'd87174328ee747898e3cb64ad6959d41'
    var url = 'https://api.instagram.com/v1/users/'+userid+'/media/recent/?client_id='+clientid

    request(url,function(error,response,body){
      if(error != null){
        console.log('Error:',error);
      }
      else {
        var images = JSON.parse(body);
        locals.data.instagram = locals.data.instagram.concat(images.data);
        locals.data.instagram.sort(sortNumber);
        var d = new Date();
        var instaTime = d.getTime();
        var instagramCache = {time:instaTime, data: locals.data.instagram};
        GLOBAL['indexInstagramCache'] = instagramCache;
      }
      view.render('index');
    });
  }

  function sortNumber(a,b) {
    return Number(b.created_time) - Number(a.created_time);
  }
}
