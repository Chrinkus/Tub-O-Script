#Node.js Module Documentation
*The following is taken from the node.js api doc*

- Node has a simple module loading system. In Node, files and modules are in one-to-one correspondance
    - example: foo.js loads the module circle.js in the same directory
```javascript
// foo.js
var circle = require('./circle.js');
console.log('The area of a circle of radius 4 is ' + circle.area(4));

// circle.js
var PI = Math.PI;

exports.area = function(r) {
    return PI * r * r;
};

exports.circumference = function(r) {
    return 2 * PI * r;
};
```
- to add functions and objects to the root of your module, you add them to the special exports object
- variables local to the module will be private as though wrapped in a functions
    - PI is private to circle.js
- if it is desired that the root of the module's export be a function (such as a constructor) or a complete object in one assignment, assign it to module.exports instead of exports
```javascript
// bar.js
var square = require('./square.js');
var mySquare = square(2);
console.log('The area of my square is ' + mySquare.area());

// square.js
module.exports = function(width) {
    return {
        area: function() {
            return width * width;
        }
    };
}
```
