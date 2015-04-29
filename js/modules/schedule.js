// ----------------------------------------------------------
//
//                 MODULE FOR SCHEDULE
//
// ----------------------------------------------------------

var twitchData;
var googleData;
var twitchAPIstatus;

function initDataLoading() {
    //Twitch Data needs to be loaded everytime the popup accures!
    loadTwitchData();
}


// This function handles the data loading from the twitch and google API.
function dataLoadHandler(data, dataSource) {

    // Show the user loading activity
    showDataLoader();

    // First load the data from twitch due to the fact that the twitch API
    // is slower then googles API.

    if (dataSource == "twitch") {
        twitchData = data;

        // Load data from google.
        loadSchedule();
    }

    if (dataSource == "google") {
        googleData = data;

        // Clear Content before adding content.
        $('.content').html("");

        // Start parsing and rendering the twitch data.
        var twitchDataHTMLString = parseTwitchData(twitchData);
        $('.content').append(twitchDataHTMLString);

        // Render background image for currentProgram

        // Avoid empty results from Twitch API. Seems to be down very quickly.
        var imgURL;

        try{
          imgURL = twitchData.stream.preview.large;
        } catch(err){
          imgURL = "http://vignette1.wikia.nocookie.net/beans/images/a/af/Rbtv-logo-2013.jpg/revision/latest?cb=20130821080020&path-prefix=de";
        }

        $('.currentprogram').css('background-image', 'url(' + imgURL + ')');

        // Start parsing and rendering the google data.
        var googleDataHTMLString = generateSchedule();
        $('.content').append(googleDataHTMLString);

        // Eventlistener for currentprogramm
        $(".currentprogram").click(function(){ openTab("twitch"); trackInteraction("Category: twitch");});
    }
}



function renderCurrentProgram(imgSrc, viewers) {

    var currentShowData = searchCurrentShow();
    var title = currentShowData.title;


    var showStatusImg = currentShowData.status;
    showStatusImg = getStatusImg(showStatusImg);

    var currentShowTime = currentShowData.start + ' bis ' + currentShowData.end;

    var htmlString = '<div id="cp" class="currentprogram"><div class="currentprogramTransOverlay">' + '  <img src="' + imgSrc + '" class="programPreview" /> <div class="programInfo">' + ' <span class="programTitle">'+ title +'</span><br>' + showStatusImg + ' mit ' + viewers + ' Zuschauer<br>' + currentShowTime + '  </div>' + '</div></div>';

    // Show twitch API problem to user.
    if(twitchAPIstatus == false){
      htmlString = htmlString + '<div class="houston">Houston we have a problem!<br>Twitch.tv ist nicht erreichbar!</div>';
    }

    return htmlString;
}

function renderSchedule(htmlArray) {

    var htmlString = '<div class="upcomingProgram">' + '<table class="scheduleTable">';

    for (var i = 0; i < htmlArray.length; i++) {
        htmlString = htmlString + htmlArray[i];
    }

    htmlString = htmlString + '</table></div>';
    return htmlString;

}

// This function generates the time schedule.
function generateSchedule() {

    var colorSkippingCount = 0;
    var colorSkippingValue;
    var trColor;
    var statusImg;
    var title;
    var timeStart;
    var timeEnd;
    var htmlArray = [];


    // Get each event in the received JSON.
    for (var i = 0; i < googleData.items.length; i++) {

        // 1. Get the requried data.
        title = googleData.items[i].summary;
        timeStart = googleData.items[i].start.dateTime;
        timeEnd = googleData.items[i].end.dateTime;

        // 2. Check wether the show is the current running show.
        var isCurrentShow = getCurrentShow(timeStart, timeEnd, title);

        // 3. Check if the showItem should be rendered or not.
        // This appears in case the show its self lies in the past.
        var renderStatus = renderShowItem(timeEnd);

        // 4. Parse show title and detect show status based on
        // the information included in the show title (title string);
        var showTitleInfo = parseShowTitle(title);

        // Parse the timeString to get the timeframe of the current event.
        var timeData = parseTimeString(timeStart);
        timeStart = timeData.time;
        timeDay = timeData.day;

        timeData = parseTimeString(timeEnd);
        timeEnd = timeData.time;

        // 5. Check if the current showItem is the current running show.
        // If so, set the show title in the programInfo div.
        if (isCurrentShow == true) {

          /** TO BE IMPLEMENTED: get the next show for push notification

            // Get the startDate of the following show for notifications.
            var nextShowData = googleData.items[i + 1];
            
            getNextShow(nextShowData); // Call function in background.js
          **/

        }

        // 6. Render show item.
        // Check the condition if the renderStatus is true
        // Check the condition if the show is NOT the current running show (to avoid duplicates!);
        // If the condition is true, the DOM item will be rendered.
        if (renderStatus == true && isCurrentShow == false) {

            // Skipping color in the table. This is a design aspect.
            // Every second <td> has a different color.
            colorSkippingValue = (colorSkippingCount % 2);

            if (colorSkippingValue == 1) {
                trColor = "#f4f4f4";
            } else {
                trColor = "#f2efef";
            }

            colorSkippingCount++;

            // Set the show status, based on the detected information
            // included in the show title.
            showStatus = showTitleInfo.status;


            // Set the status image.
            statusImg = getStatusImg(showStatus);

            // The final html string with the show information.
            var htmlString = '<tr style="background-color:' + trColor + '"><td class="tdStatus">' + statusImg + '</td><td class="tdInfo"><div class="title">' + showTitleInfo.title + '</div><div class="time">' + timeDay + ' ' + timeStart + ' - ' + timeEnd + '</div></td></tr>';

            // Append htmlString in the DOM.
            htmlArray.push(htmlString);
        }
    }

    return renderSchedule(htmlArray);
}

// This functions search for the current running show.
// Is used by the currentProgramRendering
function searchCurrentShow() {
    var title;
    var timeStart;
    var timeEnd;

    // Get each event in the received JSON.
    for (var i = 0; i < googleData.items.length; i++) {

        // 1. Get the requried data.
        title = googleData.items[i].summary;
        timeStart = googleData.items[i].start.dateTime;
        timeEnd = googleData.items[i].end.dateTime;

        // 2. Check wether the show is the current running show.
        var isCurrentShow = getCurrentShow(timeStart, timeEnd, title);

        // 4. Parse show title and detect show status based on
        // the information included in the show title (title string);
        var showTitleInfo = parseShowTitle(title);

        // Parse the timeString to get the timeframe of the current event.
        var timeData = parseTimeString(timeStart);
        timeStart = timeData.time;
        timeDay = timeData.day;

        timeData = parseTimeString(timeEnd);
        timeEnd = timeData.time;

        // 5. Check if the current showItem is the current running show.
        // If so, set the show title in the programInfo div.
        if (isCurrentShow == true) {

            var resultData = {
              title : showTitleInfo.title,
              start : timeStart,
              end : timeEnd,
              status : showTitleInfo.status
            }

            return resultData;
        }
    }

    // Avoid empty results from Twitch API. Seems to be down very quickly.
    var altTitle;

    try{
      altTitle = twitchData.stream.channel.status;
    }

    catch(err){
      altTitle = "Twitch API Problem!";
    }

    var resultData = {
      title : altTitle,
      start : "Unendlichkeit",
      end : "noch viel weiter",
      status : 4
    }

    return resultData;
}

// This function checks wether the show is live, a record or a new record.
// Based on this check, the status image of the show is set.
function getStatusImg(showStatus) {
    if (showStatus == 1) {
        return '<img src="../images/live.png" width="12" height="12"/>';
    } else if (showStatus == 0) {
        return '<img src="../images/tv.png" width="12" height="12"/>';
    } else if(showStatus == 4){
        return '<img src="../images/simon.png"/>';
    } else {
        return '<img src="../images/repeat.png" width="12" height="12"/>';
    }
}

// This function checks wether the showItem should be rendered in the DOM or not.
function renderShowItem(timeEnd) {
    var endDate = new Date(timeEnd);
    var currentDate = new Date();

    // If the endDate is smaler then the currentDate,
    // the show lies in the past and don't need do be rendered in the DOM.
    if (endDate < currentDate) {
        return false;
    }

    return true;
}

// This function check which show is currently running.
// Returns true if the input show is the current running show.
function getCurrentShow(startTime, endTime, showTitle) {
    var startDate = new Date(startTime);
    var endDate = new Date(endTime);
    var currentDate = new Date();

    // The following condition needs to be checked, to get the current running show:
    //
    //   StartTimeOfShow <= currentTime < EndTimeOfShow
    //
    //      true: the checked show is the current running show.
    //      false: the checked show is NOT the current running show.
    if (startDate <= currentDate && currentDate < endDate) {
        return true;
    }

    return false;
}

// This function parses the timeString and extracts
// the time frame (in hours) of the current event.
function parseTimeString(timeString) {

    // The time string has the following syntax:
    //      2015-03-11T10:10:00+01:00

    // Get the day.
    var currentDate = new Date();
    var showDate = new Date(timeString);
    var cdDay = currentDate.getDate();
    var swDay = showDate.getDate();

    currentDate.setDate(currentDate.getDate() + 1);
    var dayBound = currentDate.getDate();

    var day;

    if (cdDay == swDay) {
        day = "heute";
    }

    else if (dayBound ==  swDay) {
        day = "morgen";
    }

    else{
        day = "&uuml;bermorgen";
    }

    timeString = timeString.split("T");
    timeString = timeString[1].split(":");
    timeString = timeString[0] + ":" + timeString[1];

    var timeData = {
      time : timeString,
      day : day
    }

    return timeData;
}


function parseShowTitle(showTitle) {

    var isLive; // Status if show is live: 1 live, 0 not live, 2 something else.

    // Check for the characters [,],L,N using RegExp.

    // Define patterns to look for.
    var pttrnLive = "[L]";
    var pttrnRpt = "[N]";

    // Check first pattern
    var result = showTitle.search(pttrnLive);

    if (result == -1) {

        // pttrnLive not found, check for pttrnRp.
        result = showTitle.search(pttrnRpt);

        if (result == -1) {

            // pttrnRpt not found.
            isLive = 2;
        } else {

            showTitle = showTitle.replace(pttrnRpt, "");
            isLive = 0;
        }
    } else {
        showTitle = showTitle.replace(pttrnLive, "");
        isLive = 1;
    }

    var titleData = {
      title : showTitle,
      status : isLive
    }

    return titleData;
}

// Function for calling the Twitch API to receive the Twitch Data.
function loadTwitchData() {
    var twitchRbtvURL = "https://api.twitch.tv/kraken/streams/rocketbeanstv";
    HTTPRequest(twitchRbtvURL, "GET", "json", dataLoadHandler, "twitch");
}

// Callback function for the request. Renders the twitch data in the UI.
function parseTwitchData() {
  var viewers;
  var preview;

  // Avoid empty results from Twitch API. Seems to be down very quickly.
  try {
      viewers = twitchData.stream.viewers;
      preview = twitchData.stream.preview.medium;
      twitchAPIstatus = true;
  } catch(err) {
      viewers = "1337";
      preview = "http://vignette1.wikia.nocookie.net/beans/images/a/af/Rbtv-logo-2013.jpg/revision/latest?cb=20130821080020&path-prefix=de";
      twitchAPIstatus = false;
  }

  return renderCurrentProgram(preview, viewers);
}
