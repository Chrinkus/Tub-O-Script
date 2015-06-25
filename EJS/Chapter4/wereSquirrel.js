var JOURNAL = require('./jacques_journal');

var journal = [];

function addEntry(events, didITurnIntoASquirrel) {
    journal.push({
        events: events,
        squirrel: didITurnIntoASquirrel
    });
} // not used here really, journal is imported from EJS website

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
                  (table[0] + table[1]) *
                  (table[1] + table[3]) *
                  (table[0] + table[4]));
} // statistical stuff - not too strong on it...

function hasEvent(event, entry) {
    return entry.events.indexOf(event) != -1;
} // uh huh...

function tableFor(event, journal) {
    var table = [0, 0, 0, 0];
    for (var i = 0; i < journal.length; i++) { // iterating through journal
        var entry = journal[i], index = 0; // pull out specific entry, index of table is 0
        if (hasEvent(event, entry)) index += 1; // if entry contains event ex pizza move index
        if (entry.squirrel) index += 2; // if entry has squirrel event move index more
        table[index] += 1; // add one to the appropriate index
    }
    return table;
} // Aaahhh... (?)..

console.log(tableFor('pizza', JOURNAL)); // [ 76, 9, 4, 1 ]

/*
table[0] = no pizza, no squirrel
table[1] = pizza, no squirrel
table[2] = no pizza, squirrel
table[3] = pizza, squirrel
*/
