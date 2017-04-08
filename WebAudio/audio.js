let track1          = require("./track2");

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
};

audio.loadTrack = function(track) {
    "use strict";
    this.track = track;
    this.track.init(this.ctx, this.masterVoices, this.masterRhythm);
};

audio.progress = function(i) {
    /* SQUARES SPECIFIC
     * While most of the audio object is meant to be repurposed, this method
     * is specific to what needs to happen in Squares
     */
    "use strict";

    function activate(arr) {
        arr.forEach(entry => this.track[entry].active = true);
    }

    switch(i) {
        case 0:
            this.loadTrack(track1);
            this.track.start(this.ctx.currentTime);
            activate(["bass", "hihat"]);
            break;

        case 1:
            activate(["kick", "snare"]);
            break;

        case 2:
            activate(["lead"]);
            break;

        case 3:
            this.track.stop();
            this.loadTrack(track2);
            this.track.start(this.ctx.currentTime);
            activate(["kick", "snare"]);
            break;

        case 4:
            activate(["hihat", "lead"]);
            break;

        case 5:
            this.track.stop();
            break;

        default:
            console.log("Exceeded audio.progress switch range");
    }
};

audio.queueAhead = function() {
    "use strict";
    let now             = this.ctx.currentTime,
        lookAhead       = 0.2,
        relativeTime    = now - this.track.startTime,
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

    for (prop in this.track) {

        if (this.track[prop].active) {
            scheduler(this.track[prop]);
        }
    }
};

/* TEST
(function() {
    "use strict";
    let counter = 0
    audio.init(track1);

    function main() {
        window.requestAnimationFrame(main);

        if (counter % 4 === 0) {
            audio.queueAhead(track1);
        }
    }
    main();
}());
*/
