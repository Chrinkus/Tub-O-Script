let obj = Object.create(null);
console.log("toString" in obj);
obj = {
    prop1: "stuff",
    prop2: "such"
};
console.log("toString" in obj);

function adder(toBeAdded) {
    "use strict";
    return 5 + (toBeAdded || 0);
}
console.log(adder(2));
console.log(adder());

function badAdder(toBeAdded) {
    return 15 + toBeAdded;
}
console.log(badAdder(3));
console.log(badAdder());
