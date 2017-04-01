let Kick        = require("./kick");
let Snare       = require("./snare");

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let twoBars = {

    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0]
};

let kick = new Kick(audioCtx);
let snare = new Snare(audioCtx);

let tempo = 120;
let beat = 60 / tempo;
let eighths = beat / 2;

let kickSched = [];

twoBars.kick.forEach((ele, i) => {
    if (ele) {
        kickSched.push(i * eighths);
    }
});

let snareSched = [];

twoBars.snare.forEach((ele, i) => {
    if (ele) {
        snareSched.push(i * eighths);
    }
});

kickSched.forEach(ele => {
    kick.trigger(now + ele);
});

snareSched.forEach(ele => {
    snare.trigger(now + ele);
});
