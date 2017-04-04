function Distortion(ctx) {
    "use strict";
    this.ctx = ctx;
}

Distortion.prototype.setup = function() {

    function makeDistortionCurve(amount) {
        let k = typeof amount === "number" ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;
        for (; i < n_samples; i++) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    };

    this.lfo = this.ctx.createOscillator();
    this.lfoEnv = this.ctx.createGain();

    this.lfoEnv.gain.value = 50;
    
    this.osc = this.ctx.createOscillator();
    this.osc.type = "sawtooth";

    this.distortion = this.ctx.createWaveShaper();
    this.distortion.curve = makeDistortionCurve(100);
    this.distortion.oversample = "4x";

    this.lfo.connect(this.lfoEnv);
    this.lfoEnv.connect(this.osc.detune);
    this.osc.connect(this.distortion);
    this.distortion.connect(this.ctx.destination);
};

Distortion.prototype.play = function(freq, time) {
    this.setup();

    this.osc.frequency.setValueAtTime(freq, time);
    this.lfo.frequency.setValueAtTime(3.44, time);
    //this.lfo.frequency.exponentialRampToValueAtTime(2, time + 2);

    this.osc.start(time);
    this.lfo.start(time);
    this.osc.stop(time + 2);
    this.lfo.stop(time + 2);
};

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let test = new Distortion(audioCtx);
let test2 = new Distortion(audioCtx);
let test3 = new Distortion(audioCtx);

test.play(110, now);
test2.play(164.81, now);
test3.play(220, now);
