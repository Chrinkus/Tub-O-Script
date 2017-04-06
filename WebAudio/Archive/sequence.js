let Kick        = require("./kick");
let Snare       = require("./snare");
let Tone        = require("./tone");

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let twoBars = {

    tone:  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0]
};

let kick = new Kick(audioCtx);
let snare = new Snare(audioCtx);
let tone = new Tone(audioCtx);

let tempo = 120;
let beat = 60 / tempo;
let eighths = beat / 2;

let toneSched = [];

twoBars.tone.forEach((ele, i) => {
    if (ele) {
        toneSched.push(i * eighths);
    }
});

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

toneSched.forEach(ele => {
    tone.play(now + ele, 130.81, eighths)
});
