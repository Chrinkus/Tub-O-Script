// Kick drum sound experiment
//
// https://dev.opera.com/articles/drum-sounds-webaudio
// https://sonoport.github.io/synthesising-sounds-webaudio.html

function Kick(ctx) {
    "use strict";
    this.ctx = ctx;
}

Kick.prototype.setup = function() {
    this.oscTri = this.ctx.createOscillator();
    this.oscTri.type = "triangle";
    this.gainTri = this.ctx.createGain();

    this.oscTri.connect(this.gainTri);
    this.gainTri.connect(this.ctx.destination);

    this.oscSin = this.ctx.createOscillator();
    this.oscSin.type = "sine";
    this.gainSin = this.ctx.createGain();

    this.oscSin.connect(this.gainSin);
    this.gainSin.connect(this.ctx.destination);
};

Kick.prototype.trigger = function(time) {
    this.setup();

    this.oscTri.frequency.setValueAtTime(110, time);
    this.oscTri.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

    this.gainTri.gain.setValueAtTime(1, time);
    this.gainTri.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    this.oscSin.frequency.setValueAtTime(55, time);
    this.oscSin.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

    this.gainSin.gain.setValueAtTime(1, time);
    this.gainSin.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    this.oscTri.start(time);
    this.oscSin.start(time);

    this.oscTri.stop(time + 0.5);
    this.oscSin.stop(time + 0.5);
};

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var now = audioCtx.currentTime;

var kick = new Kick(audioCtx);
kick.trigger(now);
kick.trigger(now + 0.5);
kick.trigger(now + 1);
kick.trigger(now + 1.5);
