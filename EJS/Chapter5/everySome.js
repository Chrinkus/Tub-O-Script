function every(array, f) {
    var bool = true;
    array.forEach(function(ele) {
        if (!f(ele)) {
            bool = false;
        }
    });
    return bool;
}
function some(array, f) {
    var bool = false;
    array.forEach(function(ele) {
        if (f(ele)) {
            bool = true;
        }
    });
    return bool;
}
// EJS test
console.log(every([NaN, NaN, NaN], isNaN)); // true
console.log(every([NaN, NaN, 4], isNaN)); // false
console.log(some([NaN, 3, 4], isNaN)); // true
console.log(some([2, 3, 4], isNaN)); // false
