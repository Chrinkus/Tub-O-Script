#Mozilla Developer Network Pages
*The following are excerpts (or downright copy/pastes) from MDN*

**eval()**
- The eval() method evaluates Javascript code represented as a string.
```
eval(string)
```
- Parameters
    - string
        - A string representing a JavaScript expression, statement, or sequence of statements. The expression can include variables and properties of existing objects.
- eval is slow and dangerous to use. So don't.

**Function**
- The Function constructor creates a new Function object. In JavaScript every function is actually a Function object.
```
new Function([arg1[, arg2[, ...argN]],] functionBody)
```
- Parameters
    - arg1, arg2, ... argN
        - Names to be used by the function as formal argument names. Each must be a string that corresponds to a valid JavaScript identifier or a list of such strings separated by a comma; for example 'x', 'theValue', or 'a,b'.
    - functionBody
        - A string containing the JavaScript statements comprising the function definition.
- Function objects created with the constructor are parsed when the function is created.
- Constructed functions are always created in the global scope even if created within a local scope.

**Array.prototype.every()**
- The every() method tests whether all elements in the array pass the test implemented by the provided function.
```
arr.every(callback[, thisArg])
```
- Parameters
    - callback
        - Function to test for each element, taking three arguments:
            - currentValue
                - The current element being processed in the array.
            - index
                - The index of the current element being processed in the array.
            - array
                - The array every was called upon.
    - thisArg
        - Optional. Value to use as this when executing callback.
- The every method executes the provided callback function once for each element present in the array until it finds one where callback returns a falsy value. It then returns false.
    - returns true if all elements pass.
