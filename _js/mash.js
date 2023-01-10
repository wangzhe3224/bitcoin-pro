window.MashSettings = {
    id: "4b5a2e82-e11e-46b7-a4d5-36ad9d967c0e"
};
var loader = function () {
    window.Mash.init();
};
var script = document.createElement("script");
script.type = "text/javascript";
script.defer = true;
script.onload = loader;
script.src = "https://wallet.getmash.com/sdk/sdk.js";
var head = document.getElementsByTagName("head")[0];
head.appendChild(script);