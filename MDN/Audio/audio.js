let audio = Object.create(null);

audio.ctx = new (window.AudioContext || window.webkitAudioContext)();

audio.setRoutingGraph = function() {
    "use strict";
    //this.compressor = this.ctx.createDynamicsCompressor();
    //this.masterRhythm = this.ctx.createGain();
    this.masterVoices = this.ctx.createGain();
    //this.masterSFX = this.ctx.createGain();

    //this.masterRhythm.connect(this.compressor);
    //this.masterVoices.connect(this.compressor);
    //this.masterSFX.connect(this.compressor);

    //this.compressor.connect(this.ctx.destination);

    // TEMP
    this.masterVoices.connect(this.ctx.destination);
};

audio.init = function() {
    "use strict";
    this.setRoutingGraph();

    // TEST
    this.osc = this.ctx.createOscillator();
    this.osc.type = "triangle";

    this.oscEnv = this.ctx.createGain();
    this.osc.connect(this.oscEnv);
    this.oscEnv.connect(this.masterVoices);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "square";

    this.oscEnv2 = this.ctx.createGain();
    this.osc2.connect(this.oscEnv2);
    this.oscEnv2.connect(this.masterVoices);
};

audio.scheduler = function() {
    "use strict";
    let time = this.ctx.currentTime;

    this.osc.frequency.setValueAtTime(440, time);
    this.oscEnv.gain.setValueAtTime(1, time);
    this.oscEnv.gain.linearRampToValueAtTime(0.01, time + 3);

    this.osc.start(time);
    this.osc.stop(time + 3);

    this.osc2.frequency.setValueAtTime(220, time);
    this.oscEnv2.gain.setValueAtTime(1, time);
    this.oscEnv2.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    this.osc2.start(time);
    this.osc2.stop(time + 0.5);
};

// TEST
audio.init();
audio.scheduler();
