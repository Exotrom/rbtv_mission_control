$(document).ready(function() {
    // Set true for opening the extension frame in a new tab via the navigation.
    setDevMode(false);

    // The function is located in the module "schedule.js"
    // due to the fact that this module is initiated first.
    initDataLoading();
});

function initModule(contentType){
  switch(contentType){
    case 'schedule':
      $('.content').html("");
      initDataLoading();
    break;

    case 'blog':
      $('.content').html("");
      loadBlogData();
    break;

    case 'ytStd':
      $('.content').html("");
      loadYtData("ytStd");
    break;

    case 'ytLp':
      $('.content').html("");
      loadYtData("ytLp");
    break;

    case 'redditHot':
      $('.content').html("");
      loadRedditData("hot");
    break;

    case 'redditNew':
      $('.content').html("");
      loadRedditData("new");
    break;

    case 'support':
      $('.content').html("");
      renderSupportInfo();
    break;
  }
}

function showDataLoader(){
  $('.content').append('<center><div style="margin-top: 230px"><img src="../images/loader.gif"/><br><br>Lade Daten...</div></center>');
}

function setDevMode(status){
  if(status){
    $('.rblinks_nav').append('<li class="dev">devmode</li>');
  }
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
