$(document).ready(function() {
    // Set true for opening the extension frame in a new tab via the navigation.
    SystemHandler.devMode(false);

    // The function is located in the module "schedule.js"
    // due to the fact that this module is initiated first.
    Schedule.initModule();
});

var SystemHandler = new function(){
  this.initModule = function(contentType){
    switch(contentType){
      case 'schedule':
        $('.content').html("");
        Schedule.initModule();
      break;

      case 'blog':
        $('.content').html("");
        Blog.initModule();
      break;

      case 'ytStd':
        $('.content').html("");
        YouTube.initModule("ytStd");
      break;

      case 'ytLp':
        $('.content').html("");
        YouTube.initModule("ytLp");
      break;

      case 'redditHot':
        $('.content').html("");
        Reddit.initModule("hot");
      break;

      case 'redditNew':
        $('.content').html("");
        Reddit.initModule("new");
      break;

      case 'support':
        $('.content').html("");
        renderSupportInfo();
      break;
    }
  };

  this.showDataLoader = function(){
    $('.content').append('<center><div style="margin-top: 230px"><img src="../images/loader.gif"/><br><br>Lade Daten...</div></center>');
  };

  this.devMode = function(status){
    if(status){
      $('.rblinks_nav').append('<li class="dev">devmode</li>');
    }
  };

  this.HTTPRequest = function (URL, requestType, dataType, callbackFunction, dataSource){
    HTTPRequest(URL, requestType, dataType, callbackFunction, dataSource);
  };
}

// ----------------------------------------------------------
//
//                 ANALYTICS
//
// ----------------------------------------------------------

var _gaq = _gaq || [];
_gaq.push(['_setAccount', '1337']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Track user interaction for each categorie

function trackInteraction(e) {
   _gaq.push(['_trackEvent', e, 'clicked']);
 };
