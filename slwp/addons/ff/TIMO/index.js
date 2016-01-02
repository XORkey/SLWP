var self = require("sdk/self");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;


var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

tabs.on("ready", runScript);
 
function logURL(tab) {
	console.log(tab.url);
}

function runScript(tab) {
	console.log(tab.url);
	tab.attach({
		contentScript: "if (document.body) document.body.style.border = '25px solid red';"
	});
}
var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./XORkey-16.png",
    "32": "./XORkey-32.png",
    "64": "./XORkey-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://developer.mozilla.org/");
}
