const addKick = (state) => ({
    kick: (offset) => {
        const osc = state.ctx.createOscillator(),
              oscGain = state.ctx.createGain(),
              time = state.ctx.currentTime + offset;

        osc.connect(oscGain);
        oscGain.connect(state.master || state.ctx.destination);

        osc.frequency.setValueAtTime(150, time);
        oscGain.gain.setValueAtTime(1, time);

        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

        osc.start(time);
        osc.stop(time + 0.5);
    }
});

function getNoiseBuffer(ctx) {
    const bufferSize = ctx.sampleRate,
          buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
          output = buffer.getChannelData(0);
    let i;

    for (i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    return buffer;
};

const addSnare = (state) => ({
    snare: (offset) => {
        const osc           = state.ctx.createOscillator(),
              oscGain       = state.ctx.createGain(),
              noise         = state.ctx.createBufferSource(),
              noiseFilter   = state.ctx.createBiquadFilter(),
              noiseGain     = state.ctx.createGain(),
              time          = state.ctx.currentTime + offset;

        // Setup
        noise.buffer = getNoiseBuffer(state.ctx);
        noiseFilter.type = "highpass";
        noiseFilter.frequency.value = 1000;

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(state.master || state.ctx.destination);

        osc.type = "triangle";
        osc.connect(oscGain);
        oscGain.connect(state.master || state.ctx.destination);

        // Play
        noiseGain.gain.setValueAtTime(1, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        noise.start(time);

        osc.frequency.setValueAtTime(100, time);
        oscGain.gain.setValueAtTime(0.7, time);
        oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        osc.start(time);
        
        noise.stop(time + 0.02);
        osc.stop(time + 0.02);
    }
});

const drums = (ctx, master) => {
    const state = {
        ctx,
        master: master || null
    };

    return Object.assign({},
                         addKick(state),
                         addSnare(state));
};

// TEST
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const drumTest = drums(audioCtx);
[0, 1, 2, 3, 4, 5, 6, 7].forEach(entry => {
    drumTest.kick(entry);
});
[1, 3, 5, 7].forEach(entry => {
    drumTest.snare(entry);
});
