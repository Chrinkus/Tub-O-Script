// An example of loop syntax
// Some examples may be taken directly from EJS

// for loop
// when termination boundary is known or predictable

for (var number = 0; number <= 12; number += 2) {
    console.log(number);
}
// logs all even numbers from 0 - 12
// MUST use semicolons in paranthesis to separate statements within

// while loop
// can be used similarily to for loop

var num = 0;
while (num <= 12) {
    console.log(num);
    num = num + 2;
}
// same as above for loop

// while loops are good when termination condition's arrival is unknown

var health = 10;
var loops = 0;
while (health > 0) {
    health = health - Math.floor(Math.random() + 0.5);
    loops = loops + 1;
}
console.log('took ' + loops + ' turns to die');

// do while loop
// executes body at least once
// while test appears after the body

do {
    var name = prompt("What is my name?");
} while (name !== 'Chris');
console.log('You know it');

// dispatching with switch
// when if/else chains get out of hand

// instead of
var activity = prompt('What would you like to do?');
if (activity === 'nothing') {
    console.log('uh huh..');
} else if (activity === 'eat') {
    console.log('come on..');
} else if (activity === 'exercise') {
    console.log('okay!');
} else {
    console.log('hmm...');
}
// et cetera et cetera

// we can use a switch/case construct
switch (prompt('What is the weather like?')) {
    case 'rainy':
        console.log('Remember to bring an umbrella.');
        break;
    case 'sunny':
        console.log('Dress lightly.');
    case 'cloudy':
        console.log('Go outside.');
        break;
    default:
        console.log('Unknown weather type!');
        break;
}
// 
