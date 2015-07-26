// regexp object exercises

/* the replace method
console.log('Hopper, Grace\nMcCarthy, John\nRitchie, Dennis'
            .replace(/([\w ]+), ([\w ]+)/g, '$2 $1'));
// Grace Hopper
// John McCarthy
// Dennis Ritchie
*/
/*
var s = 'the cia and fbi';
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
    return str.toUpperCase();
}));
// the CIA and FBI
*/
/*
var stock = '1 lemon, 2 cabbages, and 101 eggs';
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) { // only one left, remove the 's'
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
        amount = 'no';
    }
    return amount + ' ' + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));;
// no lemon, 1 cabbage, and 100 eggs
*/
