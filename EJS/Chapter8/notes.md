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
