// ----------------------------------------------------------
//
//                 MODULE FOR REDDIT
//
// ----------------------------------------------------------

var Reddit = new function (){

  this.initModule = function loadRedditData(subredditCat){

    // Show the user loading activity
    SystemHandler.showDataLoader();
    var redditURL = "https://www.reddit.com/r/rocketbeans/"+ subredditCat + ".json?sort=new&limit=19";

    SystemHandler.HTTPRequest(redditURL, "GET", "json", parseRedditData, "reddit");
  };
}



function parseRedditData(redditData){

  var colorSkippingCount = 0;
  var colorSkippingValue;
  var trColor;

  var link_flair_text;
  var score;
  var num_comments;
  var title;
  //var url;
  var author;
  var pubDate;
  var thumbnail;
  var linkID = 0;
  var resultArray = [];


  // Get each event in the received JSON.
  for (var i = 0; i < redditData.data.children.length; i++) {

      // 1. Get the requried data.
      link_flair_text = redditData.data.children[i].data.link_flair_text;
      score = redditData.data.children[i].data.score;
      num_comments =redditData.data.children[i].data.num_comments;
      title = redditData.data.children[i].data.title;
      url = redditData.data.children[i].data.url;
      pubDate = redditData.data.children[i].data.created_utc;
      thumbnail = redditData.data.children[i].data.thumbnail;
      author = redditData.data.children[i].data.author;

      var permlink = "https://www.reddit.com";

      permlink = permlink +  redditData.data.children[i].data.permalink

      pubDate = new Date(pubDate);

      // Set the date.
      var currentDate = new Date();
      var currentDay = currentDate.getDate();
      var day = pubDate.getDate();

      var dateString;

      if(day == currentDay){
        dateString = "Heute um " + pubDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'} + "Uhr");
      }

      else{
        dateString = pubDate.toLocaleDateString() +  " um " + pubDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'} + "Uhr");
      }

      var borderStyle = "";

      if(thumbnail == "self"){
        thumbnail = "./images/std_reddit_thumb.png";
      }

      else{
        borderStyle = 'style="border: 1px solid #000"';
      }

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
      var htmlString = '<tr id="linkID'+ linkID + '" class="' + trColor + '"><td style="width: 70px;"><img ' + borderStyle + ' class="redditPreview" src="'+ thumbnail + '" /></td><td><div class="redditTitle">' + title + '<br><span class="redditInfo">von ' + author + ' mit ' + num_comments + ' Kommentaren</span><span class="redditScore"> <img src="./images/reddit_up.png" width="8" height="8"/> '+score+'</span></div></td></tr>';

      linkID++;

      var resultItem = {
        htmlString : htmlString,
        link : permlink
      }

      resultArray.push(resultItem);

  }

   return renderRedditContent(resultArray);
}

function renderRedditContent(resultArray){
  var htmlString = '<div class="catNavHeader"><ul class="redditNav"><li class="redditHot"><img src="./images/reddit.png" width="8" height="8"/> Beliebt</li><li class="redditNew"><img src="./images/reddit.png" width="8" height="8"/> Neu</li></div><div class="stdDataContainer"><table class="dataTable">';

  for (var i = 0; i < resultArray.length; i++) {
      htmlString = htmlString + resultArray[i].htmlString;
  }

  htmlString = htmlString + '</table></div>';

  $('.content').html(htmlString);

  $(".redditNew").click(function(){SystemHandler.initModule("redditNew"); trackInteraction("Reddit: New");});
  $(".redditHot").click(function(){SystemHandler.initModule("redditHot"); trackInteraction("Reddit: Hot");});

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
