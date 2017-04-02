var Tone        = require("./tone");
var Kick        = require("./kick");
var Snare       = require("./snare");
var scale       = require("./scale");
var timer       = require("./timer");

//let canvas = document.getElementById("viewport");
//let ctx = canvas.getContext("2d");
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let bas = new Tone(audioCtx, "square");
let kick = new Kick(audioCtx);
let snare = new Snare(audioCtx);

let basSched = [];
let voices = null;

let tempo = 120;
let quarters = 60 / tempo;
let eighths = quarters / 2;

let loopTime;

voices = {
    bas: [
        "D2", "", "", "D2", "", "", "", "",
        "D2", "", "", "D2", "", "", "", "",
        "C2", "", "", "C2", "", "", "", "",
        "G2", "", "", "G2", "", "", "", ""
    ]
};

loopTime = voices.bas.length * eighths * 1000;

voices.bas.forEach((entry, i) => {
    if (entry) {
        basSched.push({
            freq: scale[entry],
            time: i * eighths
        });
    }
});

let rhythmSchedule = {
    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

    snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,]
};

let rhythm = {
    kick: {
        sound: kick,
        time: []
    },
    snare: {
        sound: snare,
        time: []
    }
};
let prop;

for (prop in rhythmSchedule) {
    if (rhythmSchedule.hasOwnProperty(prop)) {

        rhythmSchedule[prop].forEach((entry, i) => {
            if (entry) {
                rhythm[prop].time.push(i * eighths);
            }
        });
    }
}

(function() {
    "use strict";
    let counter = 1;            // so when div by 1000 it doesn't throw error
    let stopMain;

    function main(tStamp) {
        let prop;

        stopMain = window.requestAnimationFrame(main);

        timer.progress(tStamp);

        if (counter < 20) {             // 50 is arbitrary, could be less
            basSched.forEach(ele => {
                bas.play(counter / 1000 + ele.time, ele.freq, eighths);
            });

            for (prop in rhythm) {
                if (rhythm.hasOwnProperty(prop)) {
                    rhythm[prop].time.forEach(ele => {
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
