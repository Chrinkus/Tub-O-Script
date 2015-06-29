function deepEqual(obj1, obj2) {
    for (var prop in obj1) {
        if (obj2.hasOwnProperty(prop)) {
            if (typeof obj1[prop] === 'object') {
                return deepEqual(obj1[prop], obj2[prop]);
            }
            if (obj1[prop] === obj2[prop]) {
                continue;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}
// Vastly different from EJS solution

//EJS tests
var obj = {here: {is: 'an'}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: 'an'}, object: 2}));
