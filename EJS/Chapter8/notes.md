#Chapter 8 - Bugs and Error Handling

- program flaws are bugs
    - some surface only when a situation unintended by the programmer occurs

###Programmer Mistakes
- Javascript offers very little help in detecting errors
    - duck typing leads to incorrect value types
    - as an interpreted language there is no compile errors
    - auto-insertion of semi-colons can misrepresent intentions of programmer
- Javascript does throw some errors
    - syntactically invalid code
    - calling something thats not a function
    - looking up a property on an undefined value
- Often buggy code will produce ```NaN``` or ```undefined``` and carry on until another part of the program fails as result of them
    - sometimes the program just produces unexpected output

###Strict Mode
*With a little help from MDN*
- The programmer can opt-in to strict mode
    - a restricted variant of Javascript
    - can apply to the entire script or individual functions
- strict mode eliminates some silent errors by changing them to throw errors
```javascript
function canYouSpotTheProblem() {
    'use strict';
    for (counter = 0; counter < 10; counter++) {
        console.log('Happy happy');
    }
}
canYouSpotTheProblem();
// ReferenceError: counter is not defined
```
- normally omitting ```var``` when assigning a new variable causes javascript to create a global variable for you and uses it
    - in strict mode an error is reported instead
- the ```this``` binding holds the value ```undefined``` in functions that are not called as methods in strict mode instead of referring to the global scope object
```javascript
function Person(name) { this.name = name; }
var ferdinand = Person('Ferdinand'); // oops
console.log(name);
// Ferdinand
```
- the above code calls a constructor without the ```new``` keyword so ```this``` will refer to the global object
    - thus creating the global variable ```name```
```javascript
'use strict';
function Person(name) { this.name = name; } // oops again
var ferdinand = Person('Ferdinand');
// TypeError: Cannot set property 'name' of undefined
```
- strict mode immediately throws an error
- strict mode also
    - can provide better optimization allowing code to run faster
    - disallows giving a function multiple parameters with the same name
    - removes some features entirely (```with```)

###Testing
- inserting random ```console.log``` statements and running programs over and over can become excessive with longer programs
- it is possible to write a second program that automates testing the actual program
    - to test the Vector type:
```javascript
function testVector() {
    var p1 = new Vector(10, 20);
    var p2 = new Vector(-10, 5);
    var p3 = p1.plus(p2);

    if (p1.x !== 10) return 'fail: x property';
    if (p1.y !== 20) return 'fail: y property';
    if (p2.x !== -10) return 'fail: negative x property';
    if (p3.x !== 0) return 'fail: x from plus';
    if (p3.y !== 25) return 'fail: y from plus';
    return 'everything ok';
}
console.log(testVector()); // everything ok
```
- there exist testing frameworks (test suites) that provide better/easier means of testing

###Debugging
- modern browsers come with the ability to set a specific breakpoint in code
    - causes execution of code to pause at the specified point and allow you to examine the values of variables at that point
    - look it up
- can also insert the statement ```debugger``` and turn on developer tools

###Error Propagation
- communicating with the outside world presents the opportunity for invalid input
- just crashing is not acceptable for big boy programs
    - we can take bad input in stride and keep running
    - report the error to the user and then give up
- one option is to return a special value such as null or undefined when incorrect input is provided
    - some functions return many types of values so this method is not great
    - this can also lead to cluttered code
    ```javascript
    function promptNumber(question) {
        var result = Number(prompt(question, ''));
        if (isNaN(result)) return null;
        else return result;
    }
    console.log(promptNumber('How many trees do you see?'));
    ```

###Exceptions
*Example in badInput.js*
- modern javascript environments allow the instances of the Error constructor to also gather information about the call stack that existed when the exception was created
    - stack trace
        - tells us function where problem occurred and which functions led up to it

###Cleaning Up After Exceptions
*Example in context.js*
- try statements also have a ```finally``` feature
    - no matter what happens in the try block, the finally block will execute
    - 'clean-up' code

###Selective Catching
- javascript doesn't provide support for selectively catching exceptions
    - either catch all or none
- the following attempts to keep calling ```promptDirection``` until a valid response is provided
    - the misspelled function call causes an 'undefined variable' error
        - by ignoring the catch error (e) we assume bad input for errors
```javascript
for (;;) {
    try {
        var dir = promtDirection('Where?'); // typo
        console.log('You chose ', dir);
        break;
    } catch (e) {
        console.log('Not a valid direction. Try again.');
    }
}
```
- don't blanket catch exceptions unless that is the goal
- instead check in the catch block if the exception is the one we expected and throw it if its not
    - could check message property but thats not cool
    - define a new type of error and use ```instanceOf``` to verify it
```javascript
function InputError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = 'InputError';
```
- has a name because standard error types all do
- now promptDirection can throw this error
    - loop can catch it specifically
```javascript
var result = prompt(question) {
    var result = prompt(question, '');
    if (result.toLowerCase() == 'left') return 'L';
    if (result.toLowerCase() == 'right') return 'R';
    throw new InputError('Invalid direction: ' + result);
}
for (;;) {
    try {
        var dir = promptDirection('Where?');
        console.log('You chose ', dir);
        break;
    } catch (e) {
        if (e instanceOf InputError) {
            console.log('Not a valid direction. Try again.');
        } else {
            throw e;
        }
    }
}
```
- running with typo will cause catch to run ```else``` code

###Assertions
- Assertions are a tool to help detect programmer errors
```javascript
function AssertionFailed(message) {
    this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
    if (!test) {
        throw new AssertionFailed(message);
    }
}
function lastElement(array) {
    assert(array.length > 0, 'empty array in lastElement');
    return array[array.length - 1];
}
```
- usually, the lastElement function would return undefined on an empty array
    - this way, we catch the error at the point of the mistake rather than waiting till we try to operate on the returned value or further down the road

END OF CHAPTER
