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
