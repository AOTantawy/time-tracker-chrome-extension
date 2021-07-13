let hr = 0;
let min = 0;
let sec = 0;
let interval = null;

chrome.action.setBadgeText({ text: "0" });
chrome.action.setBadgeBackgroundColor({ color: "#4688F1" });

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    
    if (msg.start === "start" ) {
      console.log("start");
      manageInterval(port);
    } else if (msg.pause === "pause") {
      console.log("pause");
      clearInterval(interval);
      port.postMessage({ hr, min, sec });
    } else {
      console.log("reset");
      clearInterval(interval);
      hr = min = sec = 0;
      port.postMessage({ hr, min, sec });
    }

  });
});

function manageInterval(port) {
  clearInterval(interval);
  interval = setInterval(() => {
    sec++;
    if (sec > 60) {
      sec = 0;
      min++;
    }
    if (min > 60) {
      min = 0;
      hr++;
    }
    try {
      port.postMessage({ hr, min, sec });
      console.log("connected Port");
    } catch {
      console.log("disconnected port");
    }
    updateBadge(hr,min);
  }, 1000);
}


function updateBadge(hr,min) {
    chrome.action.setBadgeText({ text: `${hr * 60 + min}` });
}