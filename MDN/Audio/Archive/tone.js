function Tone(ctx, type) {
    "use strict";
    this.ctx = ctx;
    this.type = type;
}

Tone.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainEnv = this.ctx.createGain();

    this.osc.type = this.type;

    this.osc.connect(this.gainEnv);
    this.gainEnv.connect(this.ctx.destination);
};

Tone.prototype.play = function(triggerTime, freq, dur) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(100, time);
    this.osc.frequency.setValueAtTime(150, time + 1);
    this.osc.frequency.setValueAtTime(200, time + 2);
    this.osc.frequency.setValueAtTime(250, time + 3);
    this.gainEnv.gain.setValueAtTime(0.5, time);

    this.osc.start(time);
    //this.osc.stop(time + dur);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Tone;
}

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let tone = new Tone(audioCtx, "sawtooth");
let dur = 0.5;
tone.play(now, 110, dur);

