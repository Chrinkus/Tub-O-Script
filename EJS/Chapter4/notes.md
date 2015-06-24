#Chapter 4 - Data Structures: Objects and Arrays
*This chapter uses a case study to provide data and reasons for sorting it*

Data Sets
- to work with data we need to find a way to organize it
    - arrays store sequences of values indexed numerically
    - objects store arbitrary collections of properties
        - objects can contain arrays and arrays can contain objects

Properties
- all javascript values have properties except for null and undefined
- the two ways to access properties are with a dot and square brackets
    - value.x and value[x]
        - both access a property on value but not necessarily the same property
            - dot notation directly names a property
                - the part after the dot must be a valid variable name
            -  in bracket notation the expression between brackets is evaluated to get property name
                - value.x fetches the property value named 'x'
                - value[x] evaluates expression x and uses the result as the property name

Methods
- properties that refer to function values are methods
- some methods of array objects
```javascript
var mack = [];
mack.push('Mack');
mack.push('the', 'Knife');
console.log(mack); // ["Mack", "the", "Knife"]
console.log(mack.join(" ")); // Mack the Knife
console.log(mack.pop()); // Knife
console.log(mack); // ["Mack", "the"]
```

Objects
- objects are created using braces
```javascript
var day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running", "television"]
};
console.log(day1.squirrel); // false
console.log(day1.wolf); // undefined
day1.wolf = false;
console.log(day1.wolf); // false
```
- properties whose names are not valid variable names must be quoted
- the delete operator removes a property completely
    - this is not a common thing to do
```javascript
var anObject = {left: 1, right: 2};
console.log(anObject.left); // 1
delete anObject.left;
console.log(anObject.left); // undefined
console.log("left" in anObject); // false
console.log("right" in anObject); // true
```
- the binary ```in``` operator returns a Boolean value that indicates whether the object has that property

Mutability
