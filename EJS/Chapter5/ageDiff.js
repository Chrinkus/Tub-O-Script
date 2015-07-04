var ANCESTRY =  require('./ancestry');

var ancestry = JSON.parse(ANCESTRY);

// average() and byName() from chapter
function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

function motherData(person) {
    return byName[person.mother];
}

function ageDiff(person) {
    return person.born - byName[person.mother].born;
}

console.log(average(ancestry.filter(motherData).map(ageDiff))); // 31.2?
