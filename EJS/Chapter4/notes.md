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
- mutable vs non-mutable is tricky
    - primitive data types are non-mutable but MAY be reassigned
        - the actual value a variable refers to is created and still exists even if variable is reassigned
```javascript
for (var count = 0; count < 10; count++) {
    console.log('Abandon ye ' + count);
}
```
- each loop of the above code logs the count variable (a number) then increases it
    - increasing count does not change the value in count but rather points count at a new value
        - a trail of values is left un-assigned in memory until garbage collection does its job
    - unless 'count' is operated on directly the value within will not change
- values within objects can be changed by modifying the corresponding property
```javascript
var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};

console.log(object1 == object2); // true
console.log(object1 == object3); // false
object1.value = 15;
console.log(object2.value); // 15
console.log(object3.value); // 10
```
- the value property of object2 is altered when object1's value is changed
