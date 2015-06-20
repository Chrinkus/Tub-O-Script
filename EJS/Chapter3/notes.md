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
