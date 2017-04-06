let audio = Object.create(null);

audio.ctx = new (window.AudioContext || window.webkitAudioContext)();

audio.setupRoutingGraph = function() {
    "use strict";
    this.compressor = this.ctx.createDynamicsCompressor();

    this.masterVoices = this.ctx.createGain();
    this.masterRhythm = this.ctx.createGain();
    this.masterFX = this.ctx.createGain();

    this.compressor.connect(this.ctx.destination);

    this.masterVoices.connect(this.compressor);
    this.masterRhythm.connect(this.compressor);
    this.masterFX.connect(this.compressor);
};

audio.bgmInit = function(track) {
    "use strict";
    track.init(this.ctx, this.masterVoices, this.masterRhythm);
};

audio.queueAhead = function() {
    "use strict";
    let lookAhead = this.ctx.currentTime + 50;

    function queuer(part) {

        while (part.schedule[0].when + part.zeroRef < lookAhead) {
            part.queue();

            if (!part.schedule.length) {
                part.reset();
                break;
            }
        }
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = audio;
}
