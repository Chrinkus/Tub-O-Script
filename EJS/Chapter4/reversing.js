// reverse into a new array
function reverseArray(arr) {
    var revArr = [];
    for (var i = 0; i < arr.length; i++) {
        revArr.unshift(arr[i]);
    }
    return revArr;
}
var test = [1, 2, 3, 4, 5];
//console.log(reverseArray(test));
//console.log(test);

// modify given array
function reverseArrayInPlace(arr) {
    for (var i = arr.length - 2; i >= 0; i--) {
        arr.push(arr.splice(i, 1)[0]);
    }
}
console.log(test);
reverseArrayInPlace(test);
console.log(test);
