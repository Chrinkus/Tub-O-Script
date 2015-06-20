#Chapter 3 - Functions

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
- use of ```return``` without an expression returns undefined

Parameters and Scopes
- parameters are provided by the caller, not function
