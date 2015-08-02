#Chapter 10 - Modules
- for larger programs, code can be divided into clusters that belong together and saved in separate file spaces

###Why Modules Help
- structure helps people new to the code read it
    - makes it easier for the programmer to keep related sections together
- literate programming is modular with lots of comments detailing functionality
- general rule
    - in the early stages of a project keep everything where it is convenient and worry about structuring after the code stabilizes

###Namespacing
- due to javascript's scope restrictions (global, local function) we must be creative in defining sub-namespaces
    - objects can be used to create publicly accessible sub-namespaces
    - fucntions can be used to create isolated, private namespaces

###Reuse
- some code that we write can be reusable in other situations
    - if that code was part of a large, single file program extracting it would be difficult and its dependencies may be unclear
    - if that code is in a large modular program it would be much easier to reuse it, upgrade it, and expand its functionality
        - this is the library concept
- NPM is an example of a shared modular library system

###Decoupling
- modular programming can behave similar to interfaces
    - as module is updated with bug fixes the existing interface remains stable
        - stable does not mean no new functionality
            - just that as new code is added it remains true to the original design so that older programs still work AND have access to the new functionality

###Using Functions as Namespaces
- functions are the only way to create a local scope so our modules will have to be based on them
```javascript
var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function dayName(number) {
    return names[number];
}
console.log(dayName(1)); //> Monday
```
- dayName is part of the module's interface but the names array is not
    - would prefer NOT to spill into global scope
```javascript
var dayName = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return function(number) {
        return names[number];
    };
}();
console.log(dayName(3)); //> Wednesday
```
- names is now local in an unnamed function
    - that anonymous function is created and immediately called and its return value, the original dayName function is stored in the dayName variable
- can use a similar pattern to make a private function/scope
```javascript
(function() {
    function square(x) { return x * x; }
    var hundred = 100;

    console.log(square(hundred));
})(); //> 10000
```
- this module is wrapped in a function

###Objects as Interfaces
- if we wanted to add another function to our module that went from a day name to a number we can't return a single function anymore
    - must wrap two functions in an object
```javascript
var weekDay = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
        name: function(number) { return names[number]; },
        number: function(name) { return names.indexOf(name); }
    };
}();
console.log(weekDay.name(weekDay.number("Sunday"))); //> Sunday
```
- for bigger modules gathering all of the output functions into an object can be awkward due to their size
    - declare an object (conventionally named exports) and add properties to it whenever defining something that needs to be exported
```javascript
(function(exports) {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    exports.name = function(number) {
        return names[number];
    };
    exports.number = function(name) {
        return names.indexOf(name);
    };
})(this.weekDay = {});
console.log(weekDay.name(weekDay.number("Saturday"))); //> Saturday
```
- the module takes an interface object as an argument
    - outside the function ```this``` refers to the global scope object

###Detaching from the Global Scope
- above pattern is common use for modules intended for the browser
    - claims a single global variable and wraps code in a function to create its own private namespaces
        - still an issue if another module tries to claim the same name
        - or if you want to load two versions of the same module along side each other
- we will create a system that allows one module to request the interface of an object of another module without going through the global scope
    - require function
        - loads a module's file and returns the appropriate interface value
            - solves above issues
            - makes dependencies explicit
        - needs
            - a function ```readFile``` which returns the content of a given file as a string
                - does not exist in standard JS but there are ways (browser, node.js)
            - the ability to execute the string as javascript code

###Evaluating Data as Code
- could use eval() to execute code but eval is awfully awful
```javascript
function evalAndReturnX(code) {
    eval(code);
    return x;
}
console.log(evalAndReturnX('var x = 2')); //> 2
```
- better to use the Function constructor
```javascript
var plusOne = new Function('n', 'return n + 1;');
console.log(plusOne(4)); //> 5
```
- with this we can wrap the module's code in a function creating our module scope

###The require Function
- basic implementation of ```require```:
```javascript
function require(name) {
    var code = new Function('exports', readFile(name));
    var exports = {};
    code(exports);
    return exports;
}
console.log(require('weekDay').name(1)); //> Monday
```
- since the module's code will be wrapped in a function we don't have to write a wrapping namespace function in the module file itself
    - also, since 'exports' is an argument to all new Functions the module does not have to declare it
        - this leaves us with the following for the 'weekDay' module
```javascript
var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

exports.name = function(number) {
    return names[number];
};
exports.number = function(name) {
    return names.indexOf(name);
};
```
- in use, this pattern typically starts with a few variable declaration calls to require
```javascript
var weekDay = require('weekDay');
var today = require('today');

console.log(weekDay.name(today.dayNumber()));
```
