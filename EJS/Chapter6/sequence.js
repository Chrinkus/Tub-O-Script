function Sequence() {
    this.args = arguments;
}
Object.defineProperty(Sequence.prototype, 'array', {
    get: function() {
        var seq = [];
        for (var i = 0; i < this.args.length; i++) {
            seq.push(this.args[i]);
        }
        return seq;
    }
});
Sequence.prototype.iter = function(max, f) {
    for (var i = 0; i < (this.array.length < max ? this.array.length : max); i++) {
        f(this.array[i]);
    }
};

function ArraySeq(array) {
    this.array = array;
}
ArraySeq.prototype.iter = function(max, f) {
    return Sequence.prototype.iter.call(this, max, f);
};

function RangeSeq(min, max) {
    this.min = min;
    this.max = max;
}
Object.defineProperty(RangeSeq.prototype, 'array', {
    get: function() {
        var range = [];
        for (var i = this.min; i <= this.max; i++) {
            range.push(i);
        }
        return range;
    }
});
RangeSeq.prototype.iter = function(max, f) {
    return Sequence.prototype.iter.call(this, max, f);
};

function logFive(seqObj) {
    seqObj.iter(5, console.log);
}


// My tests
//var testSeq = new Sequence(1, 1, 2, 3, 5, 8);
//console.log(testSeq.array);
//testSeq.iter(3, console.log);
logFive(new Sequence(1, 1, 2, 3, 5, 8)); //success!!

// EJS tests
logFive(new ArraySeq([1, 2]));
// 1
// 2
logFive(new RangeSeq(100, 1000));
// 100
// 101
// 102
// 103
// 104
