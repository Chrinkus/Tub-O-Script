#Chapter 2 - Program Structure

Expressions
- any code that produces a value is an expression
    - literal expressions ex: 37 or 'psychonauts'
    - 2 + 3 is also an expression
    - as is !true

Statements
- as simple as an expression w/ a semicolon after it

Variables
- a common statement is the initialization of a variable
    - var a; //> define a variable and name it a
    - var b = 5; //> define b and assign it the value 5
    - var c = b + 8; //> c === 15
- var is a keyword
- variable names
    - can be anything other than keywords
    - may not include spaces
    - may have numbers but not start with them
    - may contain $ and _
- variables do not contain values, they grasp them
```javascript
var powerLevel = 7000;
powerLevel = powerLevel + 2000;
console.log(powerLevel); //> 9000(!!)
```
- variable 'a' from above grasps the value 'undefined'
- a single var statement may define multiple variables
```javascript
var name = 'Chris', age = 36, height;
console.log(name + age + height); //> Chris36undefined
```
Functions
- a piece of a program wrapped in a value
- can be applied (called, invoked) to run the wrapped program
- console.log is an example of a function
    - we call it with ()
- when functions produce a value they 'return' them

Control Flow
- statements in a program execute from top to bottom
- we can also use conditional execution using 'if' and a boolean expression
```javascript
var language = prompt('Pick a programming language to learn', '');
if (language.toLowerCase() === 'javascript') {
    alert('Good choice!');
}
```
- we can provide an alternative path with 'else'
    - also additional paths using 'else if'
```javascript
var age = prompt('How old are you?', '0');
if (age < 18) {
    alert('too young');
} else if (age > 60) {
    alert('too old');
} else {
    alert('lets play something M-rated');
}
```
###Loops

While and Do
