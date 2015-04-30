// ----------------------------------------------------------
//
//                 MODULE FOR BLOG
//
// ----------------------------------------------------------

var Blog = new function(){
  this.initModule = function loadBlogData(){

    // Show the user loading activity
    SystemHandler.showDataLoader();

    var blogRSSFeedURL = "http://rocketbeans.tv/feed/";
    SystemHandler.HTTPRequest(blogRSSFeedURL, "GET", "XML", parseBlogData, "blog");
  };
}

function parseBlogData(blogData){

  var resultArray = [];
  var title;
  var pubDate;
  var description;
  var content;
  var url;

  var colorSkippingCount = 0;
  var colorSkippingValue;
  var trColor;
  var htmlString;
  var linkID = 0;

  $(blogData).find("item").each(function(){

    title = $(this).find("title").text();
    pubDate = $(this).find("pubDate").text();
    description = $(this).find("description").text();
    url = $(this).find("link").text();
    content = $(this).find("encoded").text();

    // Set the date.

    pubDate = new Date(pubDate);
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var day = pubDate.getDate();

    var dateString;

    if(day == currentDay){
      dateString = "heute um " + pubDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) + " Uhr";
    }

    else{
      dateString = pubDate.toLocaleDateString() +  " um " + pubDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) + " Uhr";
    }


    // Get the first image of the blog article:

    var articleImgURL = getBlogArticleImage(content);

    articleImgURL = '<img src="' + articleImgURL + '" class="blogPreview" />';

    // Skipping color in the table. This is a design aspect.
    // Every second <td> has a different color.
    colorSkippingValue = (colorSkippingCount % 2);

    if (colorSkippingValue == 1) {
        trColor = "trColor1";
    } else {
        trColor = "trColor2";
    }

    colorSkippingCount++;

    htmlString = '<tr id="linkID'+linkID+'" class="' + trColor + ';"><td class="blogtd"><div style="margin-left: 10px;" class="blogtitle">' + title + '</div><div style="margin-left: 10px;" class="time">' + dateString + '</div><br><div class="blogDescription">' + articleImgURL + '<p align="justify">' + description +'</p></div></td></tr>';

    linkID++;

    var item = {
      html : htmlString,
      link : url
    }

    resultArray.push(item);

  });

  renderBlogContent(resultArray);
}

// This function extracts the first <img> tag found in the <content:encoded> tag
function getBlogArticleImage(content){

  // Get the first image of the blog article.
  var imgURL = $(content).find('img').attr("src");

  // In case there is no image used in the blog article,
  // get a standard image.
  if(imgURL == null){
    imgURL = "http://vignette1.wikia.nocookie.net/beans/images/a/af/Rbtv-logo-2013.jpg/revision/latest?cb=20130821080020&path-prefix=de";

  }

  return imgURL;
}

function renderBlogContent(resultArray){
  var elemCount = 0;
  var htmlString = '<div class="defaultDataContainer"><table class="dataTable">';

  for (var i = 0; i < resultArray.length; i++) {

    if(elemCount == 10){
      break;
    }

      htmlString = htmlString + resultArray[i].html;

      elemCount++;
  }

  htmlString = htmlString + '</table></div>';

  $('.content').html(htmlString);

  // Add click event handlers.
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
}
