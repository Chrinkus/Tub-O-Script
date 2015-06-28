/* Linked list example

var list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};
*/
/*
function listToArray(list) {
    var arr = [];
    function toArray(obj) {
        for (var prop in obj) {
            if (obj[prop]) {
                if (prop === 'value') {
                    arr.push(obj[prop]);
                }
                if (prop === 'rest') {
                    return toArray(obj.rest);
                }
            }
        }
        return arr;
    }
    return toArray(list);
}

function arrayToList(arr) {
    var list = {}, i = 0;
    function toList(obj) {
        obj.value = arr[i];
        if (i === arr.length - 1) {
            obj.rest = null;
            return list;
        }
        obj.rest = {}
        i++;
        return toList(obj.rest);
    }
    return toList(list);
}

function prepend(element, list) {
    var newList = {
        value: element,
        rest: list
    };
    return newList;
}

function nth(list, number) {
    var i = 0;
    function findIt(list, number) {
        if (i === number) {
            return list.value;
        }
        i += 1; // bad counter system
        return findIt(list.rest, number);
    }
    return findIt(list, number);
}
*/
// EJS solutions
function arrayToList(array) {
    var list = null;
    for (var i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], rest: list}; // builds list from inside-out
    }
    return list;
}

function listToArray(list) {
    var array = [];
    for (var node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

function prepend(value, list) {
    return {value: value, rest: list};
}

function nth(list, n) {
    if (!list) { // when we bottom out on null and haven't found element
        return undefined;
    } else if (n == 0) {
        return list.value;
    } else {
        return nth(list.rest, n - 1);
    }
}
// EJS tests
console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
// Gorgeous
