function range(start, end, step) {
    var arr = [];
    for (var i = start; i != end; i += step || 1) {
        arr.push(i);
    }
    arr.push(end);
    return arr;
}

function sumOfArr(arr) {
    var total = arr.reduce(function(pre, cur) {
        return pre + cur;
    });
    return total;
}

var test = range(5, 2, -1);
console.log(test);
console.log(sumOfArr(test));

// array.reduce may be cheating
// EJS solution below
function sum(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
}
