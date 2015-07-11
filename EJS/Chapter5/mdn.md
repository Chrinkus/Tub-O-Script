#Mozilla Developer Network Pages
*The following are excerpts (or downright copy/pastes) from MDN*

**Array.prototype.forEach()**
- the forEach() method executes a provided function once per array element.
```
arr.forEach(callback[, thisArg])
```
- Parameters
    - callback
        - function to execute for each element, taking three arguments:
            - currentValue: the current element being processed in the array
            - index: the index of the current value being processed in the array
            - array: the array that forEach is being applied to
        - thisArg
            - Optional. Value to use as ```this``` when executing callback

**Array.prototype.filter()**
- the filter() method creates a new array with all the elements that pass the test implemented by the provided function
```
arr.filter(callback[, thisArg])
```
- Parameters
    - callback
        - function to test each element of the array, taking three arguments:
            - element: the current element being processed in the array
            - index: the index of the current element being processed in the array
            - array: the array filter was called upon
        - return true to keep the element, false otherwise
    - thisArg
        - Optional. Value to use as ```this``` when executing callback

**Array.prototype.map()**
- the map() method creates a new array with the results of calling a provided function on every element in this array
```
arr.map(callback[, thisArg])
```
- Parameters
    - callback
        - function that produces an element of the new Array, taking three arguments:
            - current value: the current value being processed in the array
            - index: the index of the current element being processed in the array
            - array: the array map was called upon
    - thisArg
        - Optional. Value to use as ```this``` when executing callback

**Array.prototype.reduce()**
- the reduce() method applies a function against an accumulator and each value of the array (from left-to-right) has to reduce it to a single value
```
arr.reduce(callback[, initialValue])
```
- Parameters
    - callback
        - function to execute on each value in the array, taking four arguments
            - previousValue: the value previously returned in the last invocation of the callback, or initialValue, if supplied
            - currentValue: the current element being processed in the array
            - index: the index of the current element being processed in the array
            - array: the array reduce was called upon
    - initialValue
        - Optional. Object to use as the first argument (previousValue) to the first call of the callback. In this case the first element of the array will be used as the second argument (currentValue) to the first call of the callback.
        - If no initialValue was provided, then previousValue will be equal to the first element of the array and currentValue will be equal to the second.

**Function.prototype.bind()**
- the bind() method creates a new function that, when called, has its ```this``` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
```
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```
- Parameters
    - thisArg
        - the value to be passed as the ```this``` parameter to the target function when the bound function is called. The value is ignored if the bound function is constructed using the ```new``` operator.
    - arg1, arg2, ...
        - arguments to prepend to arguments provided to the bound function when invoking the target function.

**Array.prototype.concat()**
- the concat() method returns a new array comprised of the array on which it is called joined with the array(s) and/or value(s) provided as arguments
```
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
```
- Parameters
    - valueN
        - arrays and/or values to concatenate into a new array

**isNaN()**
- the isNaN() function determines whether a value is NaN or not. Returns boolean value. Recommend use of Number.isNaN()
```
isNaN(testValue)
```
- Parameters
    - testValue
        - the value to be tested. Coercion of this value can be tricky.
        
    - this is a standard function in javascript due to NaN === NaN returning false.
    - ES6 contains the Number.isNaN() function to reliably check whether a value is NaN without fear of inaccurate coercion
