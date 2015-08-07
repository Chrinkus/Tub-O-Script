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
*/

// Actual use of filter()
console.log(ancestry.filter(function(person) {
    return person.father == 'Carel Haverbeke';
}));

/* map() concept
function map(array, transform) {
    var mapped = [];
    for (var i = 0; i < array.length; i++) {
        mapped.push(transform(array[i]));
    }
    return mapped;
}

var overNinety = ancestry.filter(function(person) {
    return person.died - person.born > 90;
});
console.log(map(overNinety, function(person) {
    return person.name;
})); // filter array then map the results
*/
/* reduce() concept
function reduce(array, combine, start) {
    var current = start;
    for (var i = 0; i < array.length; i++) {
        current = combine(current, array[i]);
    }
    return current;
}

console.log(reduce([1, 2, 3, 4], function(a, b) {
    return a + b;
}, 0)); // 0 is start arg of reduce function
*/

/* ancient-most Haverbeke
console.log(ancestry.reduce(function(min, cur) {
    if (cur.born < min.born) return cur; // funky syntax
    else return min;
}));
*/
// DNA counter
var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

//console.log(byName['Philibert Haverbeke']);

function reduceAncestors(person, f, defaultValue) {
    function valueFor(person) {
        if (person == null) {
            return defaultValue;
        } else {
            return f(person, valueFor(byName[person.mother]),
                             valueFor(byName[person.father]));
        }
    }
    return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
    if (person.name == 'Pauwels van Haverbeke') {
        return 1;
    } else {
        return (fromMother + fromFather) / 2;
    }
}
var ph = byName['Philibert Haverbeke'];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4); // 0.00049

// average age for each sex
function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}
function age(p) { return p.died - p.born; }
function male(p) { return p.sex == 'male'; }
function female(p) { return p.sex == 'female'; }

console.log(average(ancestry.filter(male).map(age))); // 61.67
console.log(average(ancestry.filter(female).map(age))); // 54.56

// Binding
var theSet = ['Carel Haverbeke', 'Maria van Brussel', 'Donald Duck'];
function isInSet(set, person) {
    return set.indexOf(person.name) > -1; // indexOf returns -1 if element is not in array
}
console.log(ancestry.filter(function(person) {
    return isInSet(theSet, person);
}));
// same as
console.log(ancestry.filter(isInSet.bind(null, theSet))); // filter passes person after the bind args
