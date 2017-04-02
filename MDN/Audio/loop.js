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
