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

audio.init = function(track) {
    "use strict";
    this.setRoutingGraph();
    track.init(this.ctx, this.masterVoices, this.masterRhythm);

    // TEST
    track.started = true;
    track.startTime = this.ctx.currentTime;
    track.bass.active = true;       // still locks up browser with one part
};

audio.queueAhead = function(track) {
    "use strict";
    let now             = this.ctx.currentTime,
        lookAhead       = 0.1,
        relativeTime    = now - track.startTime,
        lookAheadTime   = relativeTime + lookAhead,
        prop;

    function scheduler(part) {
        let lookAheadMod = lookAheadTime % part.loopTime;

        while (part.schedule[0].when < lookAheadMod) {
            console.log(lookAheadMod);
            part.queue(part.schedule[0].when - relativeTime % part.loopTime);
        }
    }

    for (prop in track) {

        if (track[prop].active) {
            scheduler(track[prop]);
        }
    }
};

// TEST
(function() {
    "use strict";
    audio.init(track);

    function main() {
        window.requestAnimationFrame(main);

        audio.queueAhead(track);
    }
    main();
}());
