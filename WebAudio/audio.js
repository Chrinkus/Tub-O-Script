let track           = require("./track2");

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

    // Mixing
    this.masterVoices.gain.setValueAtTime(0.3, this.ctx.currentTime);
    track.kick.active = true;
    /*
    track.bass.schedule.forEach(entry => {
        entry.gain = 0.7;
    });
    */

    // TEST
    track.started = true;
    track.startTime = this.ctx.currentTime;
};

audio.queueAhead = function(track) {
    "use strict";
    let now             = this.ctx.currentTime,
        lookAhead       = 0.2,
        relativeTime    = now - track.startTime,
        lookAheadTime   = relativeTime + lookAhead,
        prop;

    // TODO - There has to be a better way to do this
    function scheduler(part) {
        let relativeMod     = relativeTime % part.loopTime,
            lookAheadMod    = lookAheadTime % part.loopTime;

        if (lookAheadMod < relativeMod && part.iterator > 1) {
            part.iterator = 0;
        } 

        while (part.iterator < part.schedule.length &&
                part.schedule[part.iterator].when < lookAheadMod) {

            part.queue(part.schedule[part.iterator].when - relativeMod);
            part.iterator += 1;
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
    let counter = 0
    audio.init(track);

    function main() {
        window.requestAnimationFrame(main);

        if (counter % 4 === 0) {
            audio.queueAhead(track);
        }
    }
    main();
}());