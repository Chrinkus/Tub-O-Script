function Tone(ctx, type, master) {
    "use strict";
    this.ctx = ctx;
    this.type = type;
    this.master = master || null;
}

Tone.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainEnv = this.ctx.createGain();

    this.osc.type = this.type;

    this.osc.connect(this.gainEnv);
    this.gainEnv.connect(this.master ? this.master : this.ctx.destination);
};

Tone.prototype.play = function(offset, dataObj) {
    /* dataObj
     *   frequency  "number"    sound in Hz
     *   duration   "number"    held length of note
     *   when       "number"    time location in loop (not used here)
     */

    let time = this.ctx.currentTime + offset;
    this.setup();

    this.osc.frequency.setValueAtTime(dataObj.frequency, time);
    this.gainEnv.gain.setValueAtTime(1, time);

    this.osc.start(time);
    this.osc.stop(time + dataObj.duration);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Tone;
}

/* TEST
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let tone = new Tone(audioCtx);
let data = { frequency: 220, duration: 1, when: 0 };
[0, 2, 4, 5, 6].forEach(entry => {
    tone.play(entry, data);
});
*/
