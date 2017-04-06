let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let waveType = "sine";

let oscA = audioCtx.createOscillator();
let oscC = audioCtx.createOscillator();
let oscE = audioCtx.createOscillator();
let oscG = audioCtx.createOscillator();
let oscB = audioCtx.createOscillator();

let masterGain = audioCtx.createGain();

oscA.connect(masterGain);
oscC.connect(masterGain);
oscE.connect(masterGain);
oscG.connect(masterGain);
oscB.connect(masterGain);
masterGain.connect(audioCtx.destination);

masterGain.gain.value = 0.1;

oscA.type = waveType;
oscA.frequency.value = 220;
oscA.start(now);
oscA.stop(now + 1);

oscC.type = waveType;
oscC.frequency.value = 261.63;
oscC.start(now);
oscC.stop(now + 1);

oscE.type = waveType;
oscE.frequency.value = 329.63;
oscE.start(now);
oscE.stop(now + 1);

oscG.type = waveType;
oscG.frequency.value = 392;
oscG.start(now);
oscG.stop(now + 1);

oscB.type = waveType;
oscB.frequency.value = 493.88;
oscB.start(now);
oscB.stop(now + 1);
