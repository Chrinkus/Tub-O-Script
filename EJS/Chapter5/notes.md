#Chapter 5 - Higher-Order Functions

Abstraction
- converting specific processes into generic, re-usable functions
    - the previous chapters had many uses of the for loop for array-traversal
    - substituting the forEach method allows for cleaner code
```javascript
// wereSquirrel.js
function gatherCorrelations(journal) {
    var phis = {};
    journal.forEach(function(entry) {
        entry.events.forEach(function(event) {
            if (!(event in phis)) {
                phis[event] = phi(tableFor(event, journal));
            }
        });
    });
    return phis;
}
```

Higher-Order Functions
- functions that operate on other functions
    - by taking a function as an argument (callbacks)
    - by returning them
    ```javascript
    function greaterThan(n) {
        return function(m) { return m > n; };
    }
    var greaterThan10 = greaterThan(10);
    console.log(greaterThan10(11)); // true
    ```
    - functions that change other functions
    ```javascript
    function noisy(f) {
        return function(arg) {
            console.log('calling with', arg);
            var val = f(arg);
            console.log('called with', arg, '- got', val);
            return val;
        };
    }
    noisy(Boolean)(0); // Boolean is a wrapper
    // calling with 0
    //calling with 0 - got false
    ```
- be mindful of lexical scoping when using functions in concert with each other

Passing Along Arguments
- stuff about the noisy function taking more arguments than able to process
    - illustrates the need for the apply method which is made irrelevant by ES6
- Function.prototype.apply() (MDN)
    - the apply() method calls a function with a given this value and arguments provided as an array (or an array-like object)
    - almost identical to call()
    - its really messed up and makes rest and spread worth it
        - putting a pin in it

JSON
- data format
    - all property names must be surrounded by double quotes
    - only simple data expressions are allowed
        - no function calls, variables, or any computation
    - no comments
- methods
    - JSON.stringify
        - converts a javascript value to a JSON string
            - optionally replacing values if a replacer function is specified
            - optionally including only the specified properties if a replacer array is specified
        - takes a javascript value and returns a JSON-encoded string
    - JSON.parse
        - parses a string as JSON
            - optionally transforming the value produced by parsing
        - takes a JSON-encoded string and converts it to the value it encodes
