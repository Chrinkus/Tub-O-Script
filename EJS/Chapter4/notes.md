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

Further Arrayology
- list of array methods - info from MDN
    - push - adds one or more elements to the end of an array, returns the new length
    - pop - removes the last element from an array, returns that element
    - unshift - adds one or more elements to the beginning of an array, returns new length
    - shift - removes the first element of an array, returns that element
    - indexOf - returns the first index at which a given element can be found in the array or -1 if it is not present
    - lastIndexof - returns the last index at which a given element can be found in the array or -1 if it is not present. The array is searched backwards, starting at fromIndex
        - fromIndex - optional argument. The index at which to start searching backwards. defaults to the array's length minus one. If negative, it is taken as the offset from the end of the array.
    - slice - returns a shallow copy of a portion of an array into a new array object
        - takes two args:
            - begin: zero based index at which to begin extraction. If negative indicates offset from the end of the sequence. If omitted begins from index 0.
            - end: zero based index at which to end extraction. slice extracts upto but not including end. If negative indicates offset from the end of sequence. If omitted slice extracts to the end of the sequence.
    - concat - returns a new array comprised of the array on which it was called joined with the array(s) and/or value(s) provided as arguments.

Strings and Their Properties
- useful string methods
    - slice - extracts a section of a string and returns a new string. Similar to array.slice
        - beginSlice: zero based index at which to begin extraction. If negative, it is treated as sourceLength + beginSlice.
        - endSlice: optional. Zero based index at which to end extraction. If omitted slice() extracts to the end of the string. If negative it is treated as sourceLength + endSlice.
    - indexOf - returns the index within the calling String object of the first occurrence of the specified value, starting at fromIndex. Returns -1 if the value was not found.
    - trim - removes whitespace from both ends of a string.
    - charAt - returns the specified character from a string
```javascript
var string = 'abc';
console.log(string.length); // 3
console.log(string.charAt(0)); // a
console.log(string[1]); // b
```

The arguments Object
