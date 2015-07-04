#Chapter 6 - The Secret Life Of Objects

History
- Object Oriented Programming came to the forefront in the 90's and created a divide
- objects have good and bad traits, like anything
- the best traits of objects are encapsulation, polymorphism, and, to a lesser extent, inheritance
- incidentally, I have never worked outside of OOP and am unaware of the possibilities..

Methods **rabbits.js**
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
