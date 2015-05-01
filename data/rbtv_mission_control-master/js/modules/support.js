// ----------------------------------------------------------
//
//                 MODULE FOR SUPPORT SITE
//
// ----------------------------------------------------------

function renderSupportInfo(){
  var htmlString = '<div class="defaultDataContainer"><table class="dataTable">';

  htmlString = htmlString +'<tr id="linkID0" style="background-color:#f2efef;"><td style="width: 100px;"><img class="supportImage" src="./images/support/rbshop.png" /></td><td>Rocketbeans Shop</td></tr>';
  htmlString = htmlString +'<tr id="linkID1" style="background-color:#f4f4f4;"><td style="width: 100px;"><img class="supportImage" src="./images/support/amazon-128.png" /></td><td>Amazon (DE)</td></tr>';
  htmlString = htmlString +'<tr id="linkID2" style="background-color:#f2efef;"><td style="width: 100px;"><img class="supportImage" src="./images/support/amazon-128.png" /></td><td>Amazon (AT)</td></tr>';
  htmlString = htmlString +'<tr id="linkID3" style="background-color:#f4f4f4;"><td style="width: 100px;"><img class="supportImage" src="./images/support/g2a.png""/></td><td>G2A</td></tr>';
  htmlString = htmlString +'<tr id="linkID4" style="background-color:#f2efef;"><td style="width: 100px;"><img class="supportImage" src="./images/support/lootchest.png" /></td><td>lootchest.de</td></tr>';
  htmlString = htmlString +'<tr id="linkID5" style="background-color:#f4f4f4;"><td style="width: 100px;"><img class="supportImage" src="./images/support/transaction.png" /></td><td>PayPal & &Uuml;berweisung</td></tr>';
  htmlString = htmlString + '</table></div>';

  $('.content').html(htmlString);

  // Add click event handlers.
  $("#linkID0").click(function(){ openDynamicTab("http://rocketbeans-shop.de/"); trackInteraction("Support: rocketbeans-shop");});
  $("#linkID1").click(function(){ openDynamicTab("http://www.amazon.de/?_encoding=UTF8&camp=1638&creative=19454&linkCode=ur2&site-redirect=de&tag=rocketbeansde-21&linkId=TS4VQU7BZNNUKCKO"); trackInteraction("Support: Amazon Affiliate DE");});
  $("#linkID2").click(function(){ openDynamicTab("http://www.amazon.de/?_encoding=UTF8&camp=1638&creative=19454&linkCode=ur2&site-redirect=at&tag=rocketbeansde-21&linkId=TS4VQU7BZNNUKCKO"); trackInteraction("Support: Amazon Affiliate AT");});
  $("#linkID3").click(function(){ openDynamicTab("https://www.g2a.com/?reflink=rocket-beans"); trackInteraction("Support: g2a");});
  $("#linkID4").click(function(){ openDynamicTab("http://www.lootchest.de/?affiliates=493"); trackInteraction("Support: lootchest");});
  $("#linkID5").click(function(){ openDynamicTab("http://rocketbeans.tv/#panel5"); trackInteraction("Support: PayPal & Transfer");});
}
