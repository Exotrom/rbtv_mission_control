//var gobalShowData;

function loadSchedule(){
  // 1. create Google Data API URL string.
  var googleCalenderURL = createGoogleDataAPIURL();

  // 2. Send HTTPRequest.
  // The success function in ajax.js calls the generateSchedule function (callback).
  SystemHandler.HTTPRequest(googleCalenderURL, "GET", "json", dataLoadHandler, "google");
}

// Function to create the Google Data API (v3) URL for the calender.
function createGoogleDataAPIURL(){

  // Varbales for the URL it's self.
  var calenderID = "h6tfehdpu3jrbcrn9sdju9ohj8@group.calendar.google.com";
  var baseURL = "https://www.googleapis.com/calendar/v3/calendars/"+ calenderID +"/events?";
  var key = "key=AIzaSyBuwCHEU5NnjkqoeN0fJ1ZZyoXMALeKXGg";
  var singleEvents = "&singleEvents=true";
  var orderBy = "&orderBy=startTime";

  // Get timeMin and timeMax for Google Data API (v3) query.
  var timeBoundArray  = calculateGoogleDataAPITimeBound();

  // Set timeMin and timeMax.
  var timeMin = "&timeMin=" + timeBoundArray[0];
  var timeMax = "&timeMax=" + timeBoundArray[1];

  return baseURL + key + singleEvents + orderBy + timeMin + timeMax;
}

// This function calculates timeMin and timeMax for Google Data API (v3) query.
function calculateGoogleDataAPITimeBound(){

  // The current date is used for timeStringMin,
  // for timeStringMax the current date plus 1 day is used.
  // This sets a lower and upper time bound for the query.
  // Only events in this time frame are received by the GET request.

  var dt = new Date();
  var year = dt.getFullYear();
  var month = dt.getMonth();
  var day = dt.getDate();
  var hours = dt.getHours();
  hours = "00";

  // Create the time strings.
  // The time string has the following syntax:
  //      2015-03-11T10:10:00+01:00


  var timeStringMin = year + "-" + (month+1) + "-" + day +  "T" + hours + ":00:0.000Z";

  // 2 days from now for max time bound.

  dt.setDate(dt.getDate() + 2);
  var dayBound = dt.getDate();
  var monthBound = dt.getMonth();

  var timeStringMax = year + "-" + (monthBound+1) + "-" + dayBound + "T" + hours + ":00:0.000Z";

  var timeBoundArray = new Array(timeStringMin, timeStringMax);

  return timeBoundArray;
}

// This function is the callback function after the ajax request
// (loading schedule data) has been processed.
function updateScheduleInformation(scheduleData){

  // Call function in main.js to generate the schedule.
  generateSchedule(scheduleData);

  // Set next update interval for updating the scheduleData.
  //setUpdateInterval();
}

// This function sets a time interval for the next automated update
// of the schedule data.
function setUpdateInterval(){
  console.log("Update interval set.");
  setInterval(loadSchedule, ((180 * 60) * 60)); //Update interval: 3h
}

/**

TO BE IMPLEMENTED: get next show for push notification

function getNextShow(showData){
  var showTitle = showData.summary;
  var showStartTime = showData.start.dateTime;
  showStartTime = new Date(showStartTime);
  var currentTime = new Date();

  var deltaMs = (showStartTime - currentTime);
  var deltaMins = Math.round( deltaMs / 60000); // minutes

  //setAlarm(deltaMins, showData);
}

function setAlarm(min, showData){
  gobalShowData = showData;

  chrome.alarms.create("nextShow", {delayInMinutes: min, periodInMinutes: 0.1});
  console.log("New alarm in " + min +" minutes set");
}

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
  chrome.alarms.clearAll();
  showNotification();
  loadSchedule();
});

function showNotification(){
  var title = gobalShowData.summary;
  var timeStart = gobalShowData.start.dateTime;
  var timeEnd = gobalShowData.end.dateTime;

  var infoArray = parseShowTitle(title);
  var timeArray = parseTimeString(timeStart);

  timeStart = timeArray[0];
  timeArray = parseTimeString(timeEnd);
  timeEnd =timeArray[0];

  new Notification("Jetzt: " + infoArray[0], {
    icon: './images/icon/32/recorded.png',
    body: "Von " + timeStart + " bis " + timeEnd
  });

  console.log("Notification pusched: Jetzt: " + infoArray + " :: Von " + timeStart + " bis " + timeEnd);
}   **/
