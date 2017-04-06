let track           = require("./track");

let audio = Object.create(null);

audio.ctx = new (window.AudioContext || window.webkitAudioContext)();

audio.setRoutingGraph = function() {
    "use strict";
    this.compressor = this.ctx.createDynamicsCompressor();
    this.masterRhythm = this.ctx.createGain();
    this.masterVoices = this.ctx.createGain();
    this.masterSFX = this.ctx.createGain();

    this.masterRhythm.connect(this.compressor);
    this.masterVoices.connect(this.compressor);
    this.masterSFX.connect(this.compressor);

    this.compressor.connect(this.ctx.destination);
};

audio.init = function() {
    "use strict";
    this.setRoutingGraph();
    track.init(this.ctx, this.masterVoices, this.masterRhythm);
};

audio.scheduler = function() {
    "use strict";
    let time = this.ctx.currentTime;
};

// TEST
audio.init();
audio.scheduler();
