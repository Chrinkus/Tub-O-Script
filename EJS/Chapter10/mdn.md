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
