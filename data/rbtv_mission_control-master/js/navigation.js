// Hashmap with URLs used in the extension
var tabURLs = {
	'home' 		: 'http://rocketbeans.tv/',
	'twitch' 	: 'http://www.twitch.tv/rocketbeanstv',
	'reddit' 	: 'https://www.reddit.com/r/rocketbeans',
	'yt' 			: 'https://www.youtube.com/user/ROCKETBEANSTV',
	'twitter' : 'https://twitter.com/therocketbeans',
	'info'		: './rbtv_mission_control-master/content/information.html',
	'dev'			: 'popup.html',
};

// Function for opening new tab within chrome loading the requested URL.
function openTab(mapKey){

  // Check if the mapKey is in the hashmap tabURLs.
  if(mapKey in tabURLs){

      // If mapKey was found, open new tab with requested URL and closes the popup.
      self.port.emit("openTab", tabURLs[mapKey]);
  }
}

// EventListener used for DOM binding. In Firefox you have to use $(window).load instead of document.addEventListener().
$(window).load( function() {
	$(".schedule").click(function(){ SystemHandler.initModule("schedule"); trackInteraction("Category: schedule");});
	$(".blog").click(function(){ SystemHandler.initModule("blog"); trackInteraction("Category: blog");});
	$(".support").click(function(){ SystemHandler.initModule("support"); trackInteraction("Category: support");});
	$(".yt").click(function(){ SystemHandler.initModule("ytStd"); trackInteraction("Category: youtube");});
	$(".twitter").click(function(){ openTab("twitter");  trackInteraction("Category: twitter");});
	$(".reddit").click(function(){ SystemHandler.initModule("redditHot"); trackInteraction("Category: reddit");});
	$(".info").click(function(){ openTab("info"); trackInteraction("Category: info");});
	$(".dev").click(function(){ openTab("dev");});
});

function openDynamicTab(tabURL) {
    //Opens the tybURL in a new tab and closes the popup.
    self.port.emit("openTab", tabURL);
}
