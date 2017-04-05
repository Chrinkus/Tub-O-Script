let audio = (function() {
    "use strict";
    let audio = Object.create(null);
    return audio;
}());

audio.ctx = new (window.AudioContext || window.webkitAudioContext)();

audio.setRoutingGraph = function() {
    // strict mode?
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = audio;
}
