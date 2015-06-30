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
