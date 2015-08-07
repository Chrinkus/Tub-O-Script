var ANCESTRY = require('./ancestry');

var ancestry = JSON.parse(ANCESTRY);

// average()
function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}
/*
function age(person) { return person.died - person.born; }

function cent(person) { return Math.ceil(person.died / 100); }

var grouped = {
    "16": [],
    "17": [],
    "18": [],
    "19": [],
    "20": [],
    "21": []
};
ancestry.forEach(function(person) {
    grouped[cent(person)].push(person);
});

for (var prop in grouped) {
    console.log(prop + ': ' + average(grouped[prop].map(age)));
}
*/
//EJS solution
function groupBy(array, groupOf) {
    var groups = {};
    array.forEach(function(element) {
        var groupName = groupOf(element);
        if (groupName in groups) {
            groups[groupName].push(element);
        } else {
            groups[groupName] = [element];
        }
    });
    return groups;
}

var byCentury = groupBy(ancestry, function(person) {
    return Math.ceil(person.died / 100);
});

for (var century in byCentury) {
    var ages = byCentury[century].map(function(person) {
        return person.died - person.born;
    });
    console.log(century + ': ' + average(ages));
}

/* failed attempt
function groupBy(array, f) {
    var obj = {};
    array.forEach(f(obj));
    return obj;
}
function centurize(person, obj) {
    var prop = cent(person).toString();
    if (!(prop in obj)) {
        obj.prop = [];
    }
    obj.prop.push(person).map(age);
}
var grouped = groupBy(ancestry, centurize);
*/
