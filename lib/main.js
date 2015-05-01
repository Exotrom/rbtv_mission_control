var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");



// Creates a button.
var button = ToggleButton({
  id: "rbtv_mission_control_btn",
  label: "Mission Control",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

// Creates a popup panel and injects the JS.
var panel = panels.Panel({
    contentURL: self.data.url("rbtv_mission_control-master/popup.html"),
    contentScriptFile: [self.data.url("rbtv_mission_control-master/js/3rd/jquery-1.11.2.min.js"), self.data.url("rbtv_mission_control-master/js/ajax.js"), self.data.url("rbtv_mission_control-master/js/background.js"), self.data.url("rbtv_mission_control-master/js/main.js"), self.data.url("rbtv_mission_control-master/js/modules/schedule.js"), self.data.url("rbtv_mission_control-master/js/modules/youtube.js"), self.data.url("rbtv_mission_control-master/js/modules/reddit.js"), self.data.url("rbtv_mission_control-master/js/modules/blog.js"), self.data.url("rbtv_mission_control-master/js/modules/support.js"), self.data.url("rbtv_mission_control-master/js/navigation.js")],
    onHide: handleHide
});



// Button click event.
function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button,
	  width: 430,
	  height: 580
    });
  }
}

// Panel hide event.
function handleHide() {
  button.state('window', {checked: false});
}

// Opentab event. Gets called by the navigation.js
panel.port.on("openTab", function(url)
{
    var tabs = require("sdk/tabs");
    tabs.open(url);
    panel.hide();
});



