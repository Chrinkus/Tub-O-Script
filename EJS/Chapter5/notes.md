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
- Array.prototype.forEach()
    - the forEach() method executes a provided function once per array element.
    ```
    arr.forEach(callback[, thisArg])
    ```
    - callback
        - function to execute for each element, taking three arguments:
            - currentValue: the current element being processed in the array
            - index: the index of the current value being processed in the array
            - array: the array that forEach is being applied to
        - thisArg
            - Optional. Value to use as ```this``` when executing callback

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

Filtering an Array
- Array.prototype.filter()
    - the filter() method creates a new array with all the elements that pass the test implemented by the provided function
    ```
    arr.filter(callback[, thisArg])
    ```
    - callback
        - function to test each element of the array, taking three arguments:
            - element: the current element being processed in the array
            - index: the index of the current element being processed in the array
            - array: the array filter was called upon
        - return true to keep the element, false otherwise
    - thisArg
        - Optional. Value to use as ```this``` when executing callback

Transforming with Map
- Array.prototype.map()
    - the map() method creates a new array with the results of calling a provided function on every element in this array
    ```
    arr.map(callback[, thisArg])
    ```
    - callback
        - function that produces an element of the new Array, taking three arguments:
            - current value: the current value being processed in the array
            - index: the index of the current element being processed in the array
            - array: the array map was called upon
    - thisArg
        - Optional. Value to use as ```this``` when executing callback

Summarizing with Reduce
- Array.prototype.reduce()
    - the reduce() method applies a function against an accumulator and each value of the array (from left-to-right) has to reduce it to a single value
    ```
    arr.reduce(callback[, initialValue])
    ```
    - callback
        - function to execute on each value in the array, taking four arguments
            - previousValue: the value previously returned in the last invocation of the callback, or initialValue, if supplied
            - currentValue: the current element being processed in the array
            - index: the index of the current element being processed in the array
            - array: the array reduce was called upon
    - initialValue
        - Optional. Object to use as the first argument (previousValue) to the first call of the callback. In this case the first element of the array will be used as the second argument (currentValue) to the first call of the callback.
        - If no initialValue was provided, then previousValue will be equal to the first element of the array and currentValue will be equal to the second.

Composability & Cost
- combining higher-order functions to execute abstract solutions to problems
- unfortunately function calls are expensive insofar as causing the computer to do more work

Great-great-great...
-

Binding
- Function.prototype.bind()
    - the bind() method creates a new function that, when called, has its ```this``` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
    ```
    fun.bind(thisArg[, arg1[, arg2[, ...]]])
    ```
    - thisArg
        - the value to be passed as the ```this``` parameter to the target function when the bound function is called. The value is ignored if the bound function is constructed using the ```new``` operator.
    - arg1, arg2, ...
        - arguments to prepend to arguments provided to the bound function when invoking the target function.
- Partial Functions
```javascript
function list() {
    return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

Concat That!
- Array.prototype.concat()
    - the concat() method returns a new array comprised of the array on which it is called joined with the array(s) and/or value(s) provided as arguments
    ```
    var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
    ```
    - valueN
        - arrays and/or values to concatenate into a new array

IsNaN IsNecessary?
- isNaN()
    - the isNaN() function determines whether a value is NaN or not. Returns boolean value. Recommend use of Number.isNaN()
    ```
    isNaN(testValue)
    ```
    - testValue
        - the value to be tested. Coercion of this value can be tricky.
    - this is a standard function in javascript due to NaN === NaN returning false.
    - ES6 contains the Number.isNaN() function to reliably check whether a value is NaN without fear of inaccurate coercion
    
END OF CHAPTER
