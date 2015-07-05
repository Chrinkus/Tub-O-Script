#Chapter 6 - The Secret Life Of Objects
*These notes contain many references that can be found in the rabbits.js file*
*Code examples embedded here are references to Chapter4/wereSquirrel.js*

History
- Object Oriented Programming came to the forefront in the 90's and created a divide
- objects have good and bad traits, like anything
- the best traits of objects are encapsulation, polymorphism, and, to a lesser extent, inheritance
- incidentally, I have never worked outside of OOP and am unaware of the possibilities..

Methods
- properties that hold function values
- most methods interact with the object they are a property of
    - the variable ```this``` points to the object it was called on
- apply and bind methods both took their first argument as the value to assign ```this``` to
- call is a similar method to apply

Prototypes
- almost every object has a prototype
- a prototype is another object that is used as a fallback source of properties
- if an object is referenced for a property it does not have, the prototype will be searched, then _it's_ prototype and so on
- the Patient-Zero of prototypes is the Object.prototype
- a request for the prototype of Object.prototype returns null
    - getPrototypeOf() is a method of the Object.prototype and any object that inherits from it
- functions derive from Function.prototype
- arrays derive from Array.prototype
    - these two prototypes have the Object.prototype as their prototype which provides them with its methods
        - toString() is an interesting example
- Object.create is another method of Object.prototype that creates a new object with a specific prototype

Constructors
- a more convenient way to create objects that share a prototype is with a constructor
- the ```new``` keyword causes a function to be treated as a constructor
    - a constructor will point the new object's ```this``` keyword at itself and returns the new object
- objects created with ```new``` are _instances_ of their constructors
- convention demands that constructor names are capitalized
- the prototype of a constructor is the Function.prototype since it is a function
    - objects created by a constructor have the constructor as a prototype and then the Object.prototype further up the chain
- any properties added to the constructor will be given to all objects that have the constructor as their prototype
    - including objects that were created before the property was added

Overriding Derived properties
- adding a property to an object does not affect the object's prototype
    - that property is specific to that object
    - if the prototype already has a property with the same name the value of the prototype's property will no longer apply to the object
    - the prototype remains unchanged
- this can be used to express exceptional properties in instances of a more generic class of objects
    - the standard value is available in the prototype for nonexceptional objects
- overriding is also used to give the Array and Function prototypes different ```toString()``` methods
```javascript
console.log(Array.prototype.toString == Object.prototype.toString); // false
console.log([1, 2].toString()); // 1,2
console.log(Object.prototype.toString.call([1, 2])); // [object Array]
```

Prototype Interference
- prototypes can be used to add new properties and methods to all objects based on them at any time
    - this can be good AND bad
- objects can be used to associate values with names
    - we iterate over those values using a for/in loop
    - the prototype can pass unwanted values to our specific instance
    - values that we assign to objects are _enumerable_
- standard methods of the Object.prototype do not show up in for/ins
    - they are _nonenumerable_
- it is possible to define nonenumerable properties by using the Object.defineProperty method
```javascript
Object.defineProperty(Object.prototype, 'hiddenNonsense', {enumerable: false, value: 'hi'});

for (var name in map) {
    console.log(name);
}
// pizza
// touched tree
console.log(map.hiddenNonsense);
// hi
```
- the regular ```in``` operator still claims that Object.prototype properties exist in our object
    - we can narrow ```in```'s view to our specific object with the ```hasOwnProperty``` method
```javascript
console.log(map.hasOwnProperty('toString'));
// false
```
- this method ignores the prototype chain and instead focuses on the properties that exist in the object it is called on
- for/ins are recommended to be written as such:
```javascript
for (var name in map) {
    if (map.hasOwnProperty(name)) {
        // ... this is an own property
    }
}
```

Prototype-less Objects
- if we wanted to create a fresh object without a prototype chain we can use ```Object.create``` again
    - pass ```null``` as the prototype
```javascript
var map = Object.create(null);
map['pizza'] = 0.069;
console.log('toString' in map); // false
console.log('pizza' in map); // true
```

Polymorphism
- polymorphic code can work with values of different shapes, as long as they support the interface it expects
    - **NEED MORE**

Laying Out a Table
- write a program that, given an array of arrays of table cells, builds up a string that contains a nicely laid out table
    - this project will make use of the mountains.js file with code written in table.js
- builder function
    - ask each cell how wide and high it wants to be
        - determines the width of the columns and the height of the rows
    - ask the cells to draw themselves at the correct size
        - assemble results into a single string
- layout program
    - communicate with cells through a well defined interface
        - types of cells are not fixed in advance
            - open to adding new types later
    - interface
        - minHeight() returns a number indicating minimum height this cell requires (in lines)
        - minWidth() returns a number indicating minimum width (in characters)
        - draw(width, height) returns array of length ```height``` which contains a series of strings ```width``` characters wide
- comments will be written in the code of table.js
