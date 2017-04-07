(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./track":9}],2:[function(require,module,exports){
// Hihat Synthesis
//
// Special thanks to Joe Sullivan for the article:
// joesul.li/van/synthesizing-hi-hats

function Hihat(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master || null;
}

Hihat.prototype.setup = function() {
    let fundamental = 40,
        ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

    this.bandpass = this.ctx.createBiquadFilter();
    this.bandpass.type = "bandpass";
    this.bandpass.frequency.value = 10000;

    this.highpass = this.ctx.createBiquadFilter();
    this.highpass.type = "highpass";
    this.highpass.frequency.value = 7000;
    
    this.gainEnv = this.ctx.createGain();

    this.oscs = ratios.map(ratio => {
        let osc = this.ctx.createOscillator();
        osc.type = "square";
        osc.frequency.value = fundamental * ratio;
        osc.connect(this.bandpass);
        return osc;
    });

    this.bandpass.connect(this.highpass);
    this.highpass.connect(this.gainEnv);
    this.gainEnv.connect(this.master ? this.master : this.ctx.destination);
};

Hihat.prototype.play = function(offset) {
    let time = this.ctx.currentTime + offset;
    this.setup();

    this.gainEnv.gain.setValueAtTime(1, time);
    this.gainEnv.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    this.oscs.forEach(osc => {
        osc.start(time);
        osc.stop(time + 0.05);
    });
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Hihat;
}

/*
// TEST
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let hihat = new Hihat(audioCtx);
[0, 1, 2, 2.5, 3].forEach(entry => {
    hihat.play(entry);
});
*/

},{}],3:[function(require,module,exports){
// Kick Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Kick(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master || null;
}

Kick.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainOsc = this.ctx.createGain();
    this.osc.connect(this.gainOsc);

    this.gainOsc.connect(this.master ? this.master : this.ctx.destination);
};

Kick.prototype.play = function(offset) {
    let time = this.ctx.currentTime + offset;
    this.setup();

    this.osc.frequency.setValueAtTime(150, time);
    this.gainOsc.gain.setValueAtTime(1, time);

    this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    this.gainOsc.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    this.osc.start(time);
    this.osc.stop(time + 0.5);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Kick;
}

/*
// TEST
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let kick = new Kick(audioCtx);
[0, 1, 2, 2.5, 3].forEach(entry => {
    kick.play(entry);
});
*/

},{}],4:[function(require,module,exports){
let meter = {

    set tempo(value) {
        this.bpm = value;

        this.quarter = 60 / value;
        this.half = this.quarter * 2;
        this.whole = this.quarter * 4;
        this.eighth = this.quarter / 2;
        this.sixteenth = this.quarter / 4;
    },

    getDur(string) {
        "use strict";
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
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = meter;
}

/*
// TESTS
meter.tempo = 120;
console.log(meter.getDur("q"));
meter.tempo = 160;
console.log(meter.getDur("q"));
*/

},{}],5:[function(require,module,exports){
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Part - Rhythm or Voice
// 
// Properties
//   Part.name      {String}    "lead", "kick"
//   Part.sound     {Object}    containing audioGraph
//   Part.schedule  {Array}     of data objects {when:, freq:, dur:}
//   Part.loopTime  {Number}    seconds long
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function Part(name) {
    "use strict";
    this.name = name;
    this.sound = null;
    this.schedule = [];
    this.loopTime = 0;
}

Part.prototype.queue = function(offset) {
    this.sound.play(offset, this.schedule[0]);
    this.schedule.push(this.schedule.shift());

    // TEST
    console.log(this.schedule[0]);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Part;
}

},{}],6:[function(require,module,exports){
var scale = (function() {
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

if (typeof module !== "undefined" && module.exports) {
    module.exports = scale;
}

/*
// TEST
console.log(scale["A4"]);       // 440
*/

},{}],7:[function(require,module,exports){
// Snare Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Snare(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master || null;
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
    this.noiseGain.connect(this.master ? this.master : this.ctx.destination);

    this.osc = this.ctx.createOscillator();
    this.osc.type = "triangle";

    this.oscGain = this.ctx.createGain();
    this.osc.connect(this.oscGain);
    this.oscGain.connect(this.master ? this.master : this.ctx.destination);
};

Snare.prototype.play = function(offset) {
    let time = this.ctx.currentTime + offset;
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

if (typeof module !== "undefined" && module.exports) {
    module.exports = Snare;
}

/*
// TEST
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let snare = new Snare(audioCtx);
[0, 1, 2, 2.5, 3].forEach(entry => {
    snare.play(entry);
});
*/

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
let Tone        = require("./tone");
let Kick        = require("./kick");
let Snare       = require("./snare");
let Hihat       = require("./hihat");
let Part        = require("./part");
let meter       = require("./meter");
let scale       = require("./scale");

let track = (function() {
    "use strict";
    let track           = Object.create(null),
        voiceParts      = ["lead", "bass"],
        rhythmParts     = ["kick", "snare", "hihat"],
        units           = "eighth",
        voicePlan,
        rhythmPlan,
        prop;

    meter.tempo = 120;

    // Define track properties
    voiceParts.forEach(part => {
        track[part] = new Part(part);
    });

    rhythmParts.forEach(part => {
        track[part] = new Part(part);
    });

    // The music
    voicePlan = {
        lead: [
            "A3,hq", "", "", "", "", "", "F#/Gb3,q", "",
            "C4,qe", "", "", "B3,q", "", "A3,q", "", "G3,e",
            "A3,he", "", "", "", "", "E3,e", "G3,e", "D3,he",
            "", "", "", "", "D3,e", "E3,e", "G3,e", "F#/Gb3,e"
        ],
        bass: [
            "D2,e", "", "", "D2,e", "", "", "", "",
            "D2,e", "", "", "D2,e", "", "", "", "",
            "C2,e", "", "", "C2,e", "", "", "", "",
            "G2,e", "", "", "G2,e", "", "", "", ""
        ]
    };

    rhythmPlan = {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

        hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    };

    // Parse music
    for (prop in voicePlan) {

        voicePlan[prop].forEach((entry, i) => {
            if (entry) {
                let data = entry.split(",");
                
                track[prop].schedule.push({
                    frequency: scale[data[0]],
                    duration: meter.getDur(data[1]),
                    when: i * meter[units]
                });
            }
        });

        track[prop].loopTime = voicePlan[prop].length * meter[units];
    }
    
    for (prop in rhythmPlan) {

        rhythmPlan[prop].forEach((entry, i) => {
            if (entry) {
                track[prop].schedule.push({
                    when: i * meter[units]
                });
            }
        });

        track[prop].loopTime = rhythmPlan[prop].length * meter[units];
    }

    // Properties needed for looping
    for (prop in track) {
        track[prop].active = false;
    }

    return track;
}());

track.init = function(ctx, masterVoices, masterRhythm) {
    "use strict";
    this.started = false;
    this.startTime = 0;

    this.lead.sound = new Tone(ctx, "triangle", masterVoices);
    this.bass.sound = new Tone(ctx, "sawtooth", masterVoices);

    this.kick.sound = new Kick(ctx, masterRhythm);
    this.snare.sound = new Snare(ctx, masterRhythm);
    this.hihat.sound = new Hihat(ctx, masterRhythm);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = track;
}

/*
// TEST
console.log(track.lead.schedule);           // list of objs w/freq, dur & when
console.log(track.kick.loopTime);           // 8
console.log(track.snare.schedule[2].when);  // 1.5
console.log(track.bass.active);             // false
*/

},{"./hihat":2,"./kick":3,"./meter":4,"./part":5,"./scale":6,"./snare":7,"./tone":8}]},{},[1]);
