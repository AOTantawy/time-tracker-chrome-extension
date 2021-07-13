const port = chrome.runtime.connect({ name: "counter" });

const timeCounter = document.querySelector("#time-counter");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");

document.addEventListener("DOMContentLoaded" , () => {
    port.postMessage({ pause: "pause" });
})

start.onclick = () => {
    port.postMessage({start:"start"});
}

pause.onclick = () => {
  port.postMessage({ pause:"pause" });
};

reset.onclick = () => {
  port.postMessage({ reset:"reset" });
};


port.onMessage.addListener(function (msg) {
    timeCounter.innerHTML = `${msg.hr} hr : ${msg.min} min : ${msg.sec} sec`;
});


