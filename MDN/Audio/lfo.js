let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let lfo = audioCtx.createOscillator();
// frequency of lfo affects the rate of the vibrato
//lfo.frequency.value = 8;
lfo.frequency.setValueAtTime(0, now);
lfo.frequency.linearRampToValueAtTime(10, now + 2);

let osc = audioCtx.createOscillator();
osc.type = "triangle";
osc.frequency.value = 440;

let lfoGain = audioCtx.createGain();
// lfo gain adjusts the width of vibrato
lfoGain.gain.value = 20;

lfo.connect(lfoGain);
lfoGain.connect(osc.detune);
osc.connect(audioCtx.destination);
osc.start(now);
lfo.start(now);
osc.stop(now + 2);
lfo.stop(now + 2);
