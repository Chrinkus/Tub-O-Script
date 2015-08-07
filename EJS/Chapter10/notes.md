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
- the basic implemenation of the require function given above has problems
    - it loads and runs a module everytime it is required
        - if several modules have the same dependency they will call it multiple times
            - solution: store modules that have already been loaded in an object and use it
    - it also only allows the modules it loads to export anything other than the exports object
        - this is solved by providing modules with another variable, ```module```
            - module is an object that has a property exports
                - initially points at empty object created by require but can be overwritten
```javascript
function require(name) {
    if (name in require.cache) {
        return require.cache[name];
    }
    var code = new Function('exports, module', readFile(name));
    var exports = {}, module = {exports: exports};
    code(exports, module);

    require.cache[name] = module.exports;
    return module.exports;
}
require.cache = Object.create(null);
```
- we have a module system that uses a single global variable (require) to allow modules to find and use each other without affecting the global scope
- the above system was called *CommonJS modules* but has since been integrated into Node.js

###Slow-Loading Modules
- commonJS module style is not suited to asynchronous environments
    - commonJS lines up require calls and executes them before moving on
        - ok if all files are in one place but not if they're retrieved via the web
- there are work arounds like Browserify that resolve dependencies into a large file before loading
- another way is to wrap module code in a function so loader can load dependencies in the background then call function to initialize the module after they've been loaded
    - this is Asynchronous Module Definition (AMD)
```javascript
define(["weekDay", "today"], function(weekDay, today) {
    console.log(weekDay.name(today.dayNumber()));
});
```
- the ```define``` function
    - takes an array of module names and a function
        - function takes one argument for each dependency
    - define will load dependencies in the background allowing page to continue working
        - once all dependencies are loaded define will call the function with the interfaces of the dependencies as arguments
    - the modules must themselves have a call to define
        - the value to be exported as their interface is whatever the function passed to define returns
```javascript
// weekDay module
define([], function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return {
        name: function(number) { return names[number]; },
        number: function(name) { return names.indexOf(name); }
    };
});
```
- to demonstrate the ```define``` function we will assume we have a backgroundReadFile function
    - takes a filename and a function and calls the function with the content of the file as soon as it finishes loading it
    - define uses objects to describe the state of modules
        - available? provides interface when they are
        - getModule function takes a module name and returns the state object of that module and ensures it is scheduled to be loaded
        - uses a cache object to avoid loading same module twice
```javascript
var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
    if (name in defineCache) {
        return defineCache[name];
    }
    var module = {
        exports: null,
        loaded: false,
        onLoad: []
    };
    defineCache[name] = module;
    backgroundReadFile(name, function(code) {
        currentMod = module;
        new Function('', code)();
    });
    return module;
}
```
- assume loaded file also contains a call to define
- currentMod variable tells this call about the module object that is currently being loaded
    - will update this object when it is finished loading
```javascript
function define(depNames, moduleFunction) {
    var myMod = currentMod;
    var deps = depNames.map(getModule);
    deps.forEach(function(mod) {
        if (!mod.loaded) {
            mod.onLoad.push(whenDepsLoaded);
        }
    });

    function whenDepsLoaded() {
        if (!deps.every(function(m) { return m.loaded; })) {
            return;
        }
        var args = deps.map(function(m) { return m.exports; });
        var exports = moduleFunction.apply(null, args);
        if (myMod) {
            myMod.exports = exports;
            myMod.loaded = true;
            myMod.onLoad.every(function(f) { f(); });
        }
    }
    whenDepsLoaded();
}
```
- the execution of the above code does not follow a predictable path
    - multiple operations are set up to happen at some unspecified time in the future which makes it hard to trace how the code executes
- an example of AMD is the RequireJS project

###Interface Design
- most useful coding can be modeled in various ways
- get out there and use different interfaces to learn what makes a good and bad interface

####Predictability
- if a programmer can predict the way an interface will work they will have a better time using it
    - stick to conventions
        - if theres an existing module similar to yours, make yours resemble it
    - the way it behaves is important
        - attempting to be clever can end up making your interface harder to grasp by the user

####Composability
- try to use the simplest data structures possible and make functions do a single, clear thing
    - try to make pure functions
- modules can be made to provide their own array-like collection objects with their own interfaces for counting and extracting elements
    - such constructed objects won't have access to the many native array functions
        - also, any function expecting a normal array won't work with them
            - cannot be easily composed with other code

####Layered Interfaces
- when designing an interface for a complex piece of functionality (email)
    - you don't want to overload the user with details
    - you don't want to hide the depth of functionality either
        - provide two interfaces
            - low level for complex situations
            - high level for everyday user
                - build the high out of the low

END OF CHAPTER
