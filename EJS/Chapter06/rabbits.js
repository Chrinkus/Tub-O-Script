// companion to notes

// Methods
var rabbit = {};
rabbit.speak = function(line) {
    console.log('The rabbit says "' + line + '"');
};
//rabbit.speak('I\'m alive.');

// this
function speak(line) {
    console.log('The ' + this.type + ' rabbit says "' + line + '"');
}
var whiteRabbit = {type: 'white', speak: speak};
var fatRabbit = {type: 'fat', speak: speak};

//whiteRabbit.speak('Oh my ears and whiskers, ' + 'how late it\'s getting!');
//fatRabbit.speak('I could sure use a carrot right now.');

// call
//speak.apply(fatRabbit, ['Burp!']); // finish apply definition in Ch5
//speak.call({type: 'old'}, 'Oh my.'); // define call

// prototypes
var protoRabbit = {
    speak: function(line) {
        console.log('The ' + this.type + ' rabbit says "' + line + '"');
    }
};

/* Object.create is not recommended way of creating objects
var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEEE!');
*/

// Constructors
function Rabbit(type) {
    this.type = type;
}

var killerRabbit = new Rabbit('killer');
var blackRabbit = new Rabbit('black');
//console.log(blackRabbit.type);

Rabbit.prototype.speak = function(line) {
    console.log('The ' + this.type + ' rabbit says "' + line + '"');
};
//blackRabbit.speak('Doom...');

// overriding prototypes
Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth); // small
killerRabbit.teeth = 'long, sharp, and bloody';
console.log(killerRabbit.teeth); // long, sharp, and bloody
console.log(blackRabbit.teeth); // small
console.log(Rabbit.prototype.teeth); // small

// prototype interference
Rabbit.prototype.dance = function() {
    console.log('The ' this.type ' rabbit dances a jig.');
};
killerRabbit.dance();
