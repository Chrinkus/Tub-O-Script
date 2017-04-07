// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Part - Rhythm or Voice
// 
// Properties
//   Part.name      {String}    "lead", "kick"
//   Part.sound     {Object}    containing audioGraph
//   Part.schedule  {Array}     of data objects {when:, freq:, dur:}
//   Part.loopTime  {Number}    seconds long
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function Part(name) {
    "use strict";
    this.name = name;
    this.sound = null;
    this.schedule = [];
    this.loopTime = 0;
}

Part.prototype.queue = function(offset) {
    this.sound.play(offset, this.schedule[0]);
    this.schedule.push(this.schedule.shift());

    // TEST
    console.log(this.schedule[0]);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Part;
}
