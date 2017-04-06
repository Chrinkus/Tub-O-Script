(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Hihat(ctx) {
    "use strict";
    this.ctx = ctx;
}

Hihat.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.osc.type = "square";

    this.bandpass = this.ctx.createBiquadFilter();
    this.bandpass.type = "bandpass";
    this.bandpass.frequency.value = 10000;

    this.highpass = this.ctx.createBiquadFilter();
    this.highpass.type = "highpass";
    this.highpass.frequency.value = 7000;
    
    this.gainEnv = this.ctx.createGain();
    this.osc.connect(this.bandpass);
    this.bandpass.connect(this.highpass);
    this.highpass.connect(this.gainEnv);
    this.gainEnv.connect(this.ctx.destination);
};

Hihat.prototype.trigger = function(triggerTime) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(330, time);

    this.gainEnv.gain.setValueAtTime(1, time);
    this.gainEnv.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    this.osc.start(time);
    this.osc.stop(time + 0.05);
};

module.exports = Hihat;

},{}],2:[function(require,module,exports){
// Kick Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Kick(ctx) {
    "use strict";
    this.ctx = ctx;
}

Kick.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainOsc = this.ctx.createGain();
    this.osc.connect(this.gainOsc);
    this.gainOsc.connect(this.ctx.destination);
};

Kick.prototype.trigger = function(triggerTime) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(150, time);
    this.gainOsc.gain.setValueAtTime(1, time);

    this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    this.gainOsc.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    this.osc.start(time);
    this.osc.stop(time + 0.5);
};

module.exports = Kick;

},{}],3:[function(require,module,exports){
var Tone        = require("./tone");
var Kick        = require("./kick");
var Snare       = require("./snare");
var Hihat       = require("./hihat");
var scale       = require("./scale");
var timer       = require("./timer");
var Meter       = require("./meter");

//let canvas = document.getElementById("viewport");
//let ctx = canvas.getContext("2d");
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let sop = new Tone(audioCtx, "sine");
let bas = new Tone(audioCtx, "sawtooth");
let kick = new Kick(audioCtx);
let snare = new Snare(audioCtx);
let hihat = new Hihat(audioCtx);

let tempo = 120;
let meter = new Meter(tempo);

let loopTime = 8000;

let voiceSchedule = Object.create(null);
let rhythmSchedule = Object.create(null);
let prop;

voiceSchedule = {
    sop: [
        "A4,hq", "", "", "", "", "", "F#/Gb4,q", "",
        "C5,qe", "", "", "B4,q", "", "A4,q", "", "G4,e",
        "A4,he", "", "", "", "", "E4,e", "G4,e", "D4,he",
        "", "", "", "", "D4,e", "E4,e", "G4,e", "F#/Gb4,e"
    ],
    bas: [
        "D2,e", "", "", "D2,e", "", "", "", "",
        "D2,e", "", "", "D2,e", "", "", "", "",
        "C2,e", "", "", "C2,e", "", "", "", "",
        "G2,e", "", "", "G2,e", "", "", "", ""
    ]
};

// kill proto
let voices = {
    sop: {
        sound: sop,
        sched: []
    },
    bas: {
        sound: bas,
        sched: []
    }
};

for (prop in voiceSchedule) {
    // process
    voiceSchedule[prop].forEach((entry, i) => {
        if (entry) {
            let data = entry.split(",");
            // stuff
            voices[prop].sched.push({
                freq: scale[data[0]],
                dur: meter.getDur(data[1]),
                time: i * meter.eighth
            });
        }
    });
}

rhythmSchedule = {
    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

    snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

    hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
};

// kill proto
let rhythm = {
    kick: {
        sound: kick,
        sched: []
    },
    snare: {
        sound: snare,
        sched: []
    },
    hihat: {
        sound: hihat,
        sched: []
    }
};

for (prop in rhythmSchedule) {

    rhythmSchedule[prop].forEach((entry, i) => {
        if (entry) {
            rhythm[prop].sched.push(i * meter.eighth);
        }
    });
}

(function() {
    "use strict";
    let counter = 1;            // so when div by 1000 it doesn't throw error
    let stopMain;

    function main(tStamp) {
        let prop;

        stopMain = window.requestAnimationFrame(main);

        timer.progress(tStamp);

        if (counter < 40) {             // 50 is arbitrary, could be less

            for (prop in voices) {
                voices[prop].sched.forEach(ele => {
                    voices[prop].sound.play(counter / 1000 + ele.time,
                            ele.freq, ele.dur);
                });
            }

            for (prop in rhythm) {
                rhythm[prop].sched.forEach(ele => {
                    rhythm[prop].sound.trigger(counter / 1000 + ele);
                });
            }

            counter = counter + loopTime;
        }

        counter -= timer.delta;
    }

    main();
}());

},{"./hihat":1,"./kick":2,"./meter":4,"./scale":5,"./snare":6,"./timer":7,"./tone":8}],4:[function(require,module,exports){
function Meter(tempo) {
    "use strict";
    this.tempo = tempo;

    this.quarter    = 60 / tempo;
    this.half       = this.quarter * 2;
    this.whole      = this.quarter * 4;
    this.eighth     = this.quarter / 2;
    this.sixteenth  = this.quarter / 4;
}

Meter.prototype.getDur = function(string) {
    let dur = 0,
        l = string.length,
        i;

    for (i = 0; i < l; i++) {

        switch (string[i]) {
            case "q":
                dur += this.quarter;
                break;
            case "h":
                dur += this.half;
                break;
            case "w":
                dur += this.whole;
                break;
            case "e":
                dur += this.eighth;
                break;
            case "s":
                dur += this.sixteenth;
                break;
            default:
                // no default
        }
    }

    return dur;
};

module.exports = Meter;

},{}],5:[function(require,module,exports){
module.exports = (function() {
    "use strict";

    const A = 27.5;
    const SEMITONES = ["A", "A#/Bb", "B", "C", "C#/Db", "D",
                       "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];
    let scale = {};
    let oct = 0;
    let i, j;

    function getFrequency(centOffset) {
        return Math.pow(2, (centOffset / 1200)) * A;
    }

    for (i = 0; i < 9; i++) {

        for (j = 0; j < 12; j++) {
            scale[SEMITONES[j] + oct] = getFrequency(i * 1200 + (j * 100));

            if (SEMITONES[j + 1] === "C") {
                oct += 1;
            }
        }
    }

    return scale;
}());

},{}],6:[function(require,module,exports){
// Snare Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Snare(ctx) {
    "use strict";
    this.ctx = ctx;
}

Snare.prototype.noiseBuffer = function() {
    // sampleRate = 44100 Hz
    let bufferSize = this.ctx.sampleRate;
    // creates a buffer w/1 channel, 44100 individual samples, @ 44100 Hz
    // for 1 second of audio
    let buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    // buffer was created with 1 channel, accessed by 0 here
    let output = buffer.getChannelData(0);
    let i;

    // fill buffer w/random nums between -1 and 1
    for (i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    return buffer;
};

Snare.prototype.setup = function() {
    let noiseFilter;

    this.noise = this.ctx.createBufferSource();
    this.noise.buffer = this.noiseBuffer();

    noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1000;
    this.noise.connect(noiseFilter);

    this.noiseGain = this.ctx.createGain();
    noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.ctx.destination);

    this.osc = this.ctx.createOscillator();
    this.osc.type = "triangle";

    this.oscGain = this.ctx.createGain();
    this.osc.connect(this.oscGain);
    this.oscGain.connect(this.ctx.destination);
};

Snare.prototype.trigger = function(triggerTime) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.noiseGain.gain.setValueAtTime(1, time);
    this.noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    this.noise.start(time);

    this.osc.frequency.setValueAtTime(100, time);
    this.oscGain.gain.setValueAtTime(0.7, time);
    this.oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    this.osc.start(time);

    this.osc.stop(time + 0.02);
    this.noise.stop(time + 0.02);
};

module.exports = Snare;

},{}],7:[function(require,module,exports){
module.exports = {
    previous: 0,
    delta: 0,

    progress: function(tStamp) {
        "use strict";

        if (!this.previous) {
            this.previous = tStamp;
            return;
        }

        this.delta = tStamp - this.previous;
        this.previous = tStamp;
    }
};

},{}],8:[function(require,module,exports){
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

    this.osc.frequency.setValueAtTime(freq, time);
    this.gainEnv.gain.setValueAtTime(0.2, time);

    this.osc.start(time);
    this.osc.stop(time + dur);
};

module.exports = Tone;
/*
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let tone = new Tone(audioCtx, "sawtooth");
let dur = 0.5;
tone.play(now, 110, dur);
tone.play(now + 2 * dur, 164.81, dur * 2);
tone.play(now + 4 * dur, 196, dur / 2);
tone.play(now + 6 * dur, 220, dur);
*/

},{}]},{},[3]);
