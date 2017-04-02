var Tone        = require("./tone");
var Kick        = require("./kick");
var Snare       = require("./snare");
var Hihat       = require("./hihat");
var scale       = require("./scale");
var timer       = require("./timer");

//let canvas = document.getElementById("viewport");
//let ctx = canvas.getContext("2d");
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let sop = new Tone(audioCtx, "sine");
let bas = new Tone(audioCtx, "sawtooth");
let kick = new Kick(audioCtx);
let snare = new Snare(audioCtx);
let hihat = new Hihat(audioCtx);

let tempo = 120;
let quarters = 60 / tempo;
let eighths = quarters / 2;

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
                freq: scale[entry],
                time: i * eighths
            });
        }
    });
}

// replace
voices.bas.forEach((entry, i) => {
    if (entry) {
        basSched.push({
            freq: scale[entry],
            time: i * eighths
        });
    }
});

rhythmSchedule = {
    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

    snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

    hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
};

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
            rhythm[prop].sched.push(i * eighths);
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
            basSched.forEach(ele => {
                bas.play(counter / 1000 + ele.time, ele.freq, eighths);
            });

            for (prop in rhythm) {
                if (rhythm.hasOwnProperty(prop)) {
                    rhythm[prop].sched.forEach(ele => {
                        rhythm[prop].sound.trigger(counter / 1000 + ele);
                    });
                }
            }

            counter = counter + loopTime;
        }

        counter -= timer.delta;
    }

    main();
}());
