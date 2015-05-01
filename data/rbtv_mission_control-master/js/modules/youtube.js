// ----------------------------------------------------------
//
//                 MODULE FOR YOUTUBE
//
// ----------------------------------------------------------

var YouTube = new function(){
  this.initModule = function loadYtData(ytChannelType){

    // Show the user loading activity
    SystemHandler.showDataLoader();

    var ytURL = createGoogleDataAPIURLYoutube(ytChannelType);
    SystemHandler.HTTPRequest(ytURL, "GET", "json", parseYoutubeData, "youtube");
  };
}

function parseYoutubeData(ytData){

  var colorSkippingCount = 0;
  var colorSkippingValue;
  var trColor;

  var videoID;
  var title;
  var thumbnail;
  var linkID = 0;
  var resultArray = [];

  // Get each event in the received JSON.
  for (var i = 0; i < ytData.items.length; i++) {

      // 1. Get the requried data.
      videoID = ytData.items[i].id.videoId;
      title = ytData.items[i].snippet.title;
      thumbnail = ytData.items[i].snippet.thumbnails.medium.url;

      // Skipping color in the table. This is a design aspect.
      // Every second <td> has a different color.
      colorSkippingValue = (colorSkippingCount % 2);

      if (colorSkippingValue == 1) {
          trColor = "trColor1";
      } else {
          trColor = "trColor2";
      }

      colorSkippingCount++;

      // The final html string with the show information.
      var htmlString = '<tr id="linkID'+ linkID + '" class="' + trColor + '"><td style="width: 100px;"><img class="ytPreview" src="'+ thumbnail + '" /></td><td><div class="title, ytTitle">' + title + '</div></td></tr>';

      linkID++;

      var item = {
        html : htmlString,
        link : 'https://www.youtube.com/watch?v=' + videoID
      }

      // Append htmlString in the DOM.
      resultArray.push(item);
  }

   return renderYoutubeContent(resultArray);
}

function renderYoutubeContent(resultArray){
  var htmlString = '<div class="catNavHeader"><ul class="ytNav"><li class="ytStandard"><img src="./images/yt.png" width="8" height="8"/> Standard</li><li class="ytLetsplay"><img src="./images/yt.png" width="8" height="8"/> Let\'s Play</li></div><div class="stdDataContainer"><table class="dataTable">';

  for (var i = 0; i < resultArray.length; i++) {
      htmlString = htmlString + resultArray[i].html;
  }

  htmlString = htmlString + '</table></div>';

  $('.content').html(htmlString);

  $(".ytStandard").click(function(){SystemHandler.initModule("ytStd"); trackInteraction("Youtube: Standard");});
  $(".ytLetsplay").click(function(){SystemHandler.initModule("ytLp"); trackInteraction("Youtube: Let's Play");});

  // Add click event handlers for dynamic loaded content.
  $("#linkID0").click(function(){ openDynamicTab(resultArray[0].link);});
  $("#linkID1").click(function(){ openDynamicTab(resultArray[1].link);});
  $("#linkID2").click(function(){ openDynamicTab(resultArray[2].link);});
  $("#linkID3").click(function(){ openDynamicTab(resultArray[3].link);});
  $("#linkID4").click(function(){ openDynamicTab(resultArray[4].link);});
  $("#linkID5").click(function(){ openDynamicTab(resultArray[5].link);});
  $("#linkID6").click(function(){ openDynamicTab(resultArray[6].link);});
  $("#linkID7").click(function(){ openDynamicTab(resultArray[7].link);});
  $("#linkID8").click(function(){ openDynamicTab(resultArray[8].link);});
  $("#linkID9").click(function(){ openDynamicTab(resultArray[9].link);});
  $("#linkID10").click(function(){ openDynamicTab(resultArray[10].link);});
  $("#linkID11").click(function(){ openDynamicTab(resultArray[11].link);});
  $("#linkID12").click(function(){ openDynamicTab(resultArray[12].link);});
  $("#linkID13").click(function(){ openDynamicTab(resultArray[13].link);});
  $("#linkID14").click(function(){ openDynamicTab(resultArray[14].link);});
  $("#linkID15").click(function(){ openDynamicTab(resultArray[15].link);});
  $("#linkID16").click(function(){ openDynamicTab(resultArray[16].link);});
  $("#linkID17").click(function(){ openDynamicTab(resultArray[17].link);});
  $("#linkID18").click(function(){ openDynamicTab(resultArray[18].link);});
  $("#linkID19").click(function(){ openDynamicTab(resultArray[19].link);});

}

function createGoogleDataAPIURLYoutube(ytChannelType){
  // Varbales for the URL it's self.
  var baseURL = "https://www.googleapis.com/youtube/v3/search?";
  var channelID;

  if(ytChannelType == "ytLp"){
    // YT Chanel "Let's play" ID
    channelID = "&channelId=UCtSP1OA6jO4quIGLae7Fb4g";
  }

  else{
    // YT Chanel Standard ID
    channelID = "&channelId=UCQvTDmHza8erxZqDkjQ4bQQ";
  }

  var key = "key=AIzaSyBuwCHEU5NnjkqoeN0fJ1ZZyoXMALeKXGg";
  var part = "&part=snippet,id";
  var order = "&order=date";
  var maxResults = "&maxResults=20";

  return baseURL + key + channelID + part + order + maxResults;
}
