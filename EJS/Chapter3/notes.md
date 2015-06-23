#Chapter 3 - Functions
*These notes contain code examples taken directly from ESJ*

Functions enable us to define our own vocabulary
- creating new processes to limit repetition
- establish local scopes

Defining a Function
```javascript
var square = function(x) {
    return x * x;
};
```
- a regular variable definition where value assigned is a function
- contain a set of parameters (x) and a body to be executed
    - may take multiple parameters or none at all
- some functions ```return``` a value and some just produce a side-effect
- use of ```return``` without an expression returns ```undefined```

Parameters and Scopes
- parameters are provided by the caller, not function
- variables created inside of functions have a local scope
- variables declared outside of functions have a global scope
- block scope does not exist in ES5
```javascript
var x = 'global';

var f1 = function() {
    var x = 'local';
};
f1();
console.log(x); // global

var f2 = function() {
    x = 'local?';
};
f2();
console.log(x); // local?
```
- in ES6 the ```let``` keyword can be used to initialize a locally scoped variable

Nested Scopes
- functions can be created inside of functions to contain different levels of local scopes
- see landscape.js

Functions as Values
- functions are values and can be treated as such
    - use it in expressions
    - store it in a new place
    - pass it as an argument

Declaration Notation
```javascript
function square(x) {
    return x * x;
}
```
- function declarations exist outside of top to bottom control flow
- they are moved to the top of their scope and can be used by all code in it
- **Do NOT define a function inside of a conditional**
*Apparently that's a thing*

The Call Stack
- a place in the computer that stores the current program context when calling functions
- though large, the stack IS finite so it can cause a crash if it gets overloaded
- infinite loops and excessive recursion can cause the stack to blow

Optional Arguments
- the number of arguments that can be passed to a function are not limited by the number of parameters
    - we can send more or less than a function expects without concern for operation
- if less are sent the function may be written to accept that scenario
```javascript
function power(base, exponent) {
    if (exponent == undefined) { // provision for missing argument
        exponent = 2;
    }
    var result = 1;
    for (var count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
}

console.log(power(4)); // one argument = 4e2 = 16
console.log(power(4, 3)); // 2nd arg provided = 4e3 = 64
```
**ES6 has rest and spread that allow for unknown numbers of args to be passed**

Closure
- closure is the ability to reference a specific instance of a local variable in an enclosing function
- a function that 'closes over' some local variables is called a closure
```javascript
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

var twice = multiplier(2); // 'twice' stores the inner function of multiplier
console.log(twice(5)); // twice now executes multiplier(2) with 5 as inner parameter
```

Recursion
- when a function calls itself!!
- an alternative to the above power function
```javascript
function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    } else {
        return base * power(base, exponent - 1);
    }
}

console.log(power(2, 3)); // 8
```
- power(2, 3)
    - return 2 * power(2, 2)
        - return 2 * power(2, 1)
            - return 2 * power(2, 0)
                - return 1
            - 2 * 1
        - 2 * 2
    - 2 * 4
- 8
- very elegant solution but unfortunately 10 times slower than looping version
- **Do not worry about efficiency until you know the program is too slow**
- recursionEx.js has a good sketch of a recursive case

Growing Functions
- where functions come from
    - you find yourself repeating code
    - you need functionality that doesn't yet exist
- if finding a name for a function is hard it may need to be broken into multiple functions
- farm.js is an example from EJS that extracted zero padding from a bigger function

Functions and Side Effects
- a pure function is a specific kind of value-producing function that not only has no side effects but also doesn't rely on side-effects from other code

END OF CHAPTER
