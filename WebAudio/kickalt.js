const kicker = (state) => ({
    kick: (offset) => {
        const osc = state.ctx.createOscillator(),
              gainOsc = state.ctx.createGain(),
              time = state.ctx.currentTime + offset;

        osc.connect(gainOsc);
        gainOsc.connect(state.master ? state.master : state.ctx.destination);

        osc.frequency.setValueAtTime(150, time);
        gainOsc.gain.setValueAtTime(1, time);

        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        gainOsc.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

        osc.start(time);
        osc.stop(time + 0.5);
    }
});

const kickDrum = (ctx, master) => {
    const state = {
        ctx,
        master: master || null
    };

    return Object.assign({}, kicker(state));
};

// TEST
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const kickTest = kickDrum(audioCtx);
[0, 1, 2, 2.5, 3].forEach(entry => {
    kickTest.kick(entry);
});
