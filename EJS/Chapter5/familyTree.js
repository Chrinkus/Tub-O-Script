var ANCESTRY = require('./ancestry');

var ancestry = JSON.parse(ANCESTRY);
// console.log(ancestry.length);

/* filter() concept
function filter(array, test) { // filter an array using passed test function
    var passed = [];
    for (var i = 0; i < array.length; i++) {
        if (test(array[i])) { // if test passes push elements into new array
            passed.push(array[i]);
        }
    }
    return passed;
}

console.log(filter(ancestry, function(person) { // unnamed callback as test function
    return person.born > 1900 && person.born < 1925;
}));

// Actual use of filter()
console.log(ancestry.filter(function(person) {
    return person.father == 'Carel Haverbeke';
}));
*/
