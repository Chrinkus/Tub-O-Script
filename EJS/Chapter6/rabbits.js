// companion to notes

// Methods
var rabbit = {};
rabbit.speak = function(line) {
    console.log('The rabbit says "' + line + '"');
};
rabbit.speak('I\'m alive.');

// this
function speak(line) {
    console.log('The ' + this.type + ' rabbit says "' + line + '"');
}
var whiteRabbit = {type: 'white', speak: speak};
var fatRabbit = {type: 'fat', speak: speak};

whiteRabbit.speak('Oh my ears and whiskers, ' + 'how late it\'s getting!');
fatRabbit.speak('I could sure use a carrot right now.');

// call
speak.apply(fatRabbit, ['Burp!']); // finish apply definition in Ch5
speak.call({type: 'old'}, 'Oh my.'); // define call
