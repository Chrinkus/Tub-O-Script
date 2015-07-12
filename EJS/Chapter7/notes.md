#Chapter 7 - Project: Electronic Life

The goal of this chapter is to build a virtual ecosystem.

###Definition
- The world will be a 2D grid with any 'thing' taking up a single square
- Time is represented by turns
- The grid will be achieved with an array of strings like the variable plan
    - the # characters are walls and rocks
    - the o characters are the critters
    - the open spaces are open space
- world object
    - size and content of world
    - toString method
    - turn method

###Representing Space
- grid has a fixed width and height
- locations are defined by x- and y-coordinates
- options:
    - an array of row arrays using two property accesses
```javascript
var grid = [['top left', 'top middle', 'top right'],
            ['bottom left', 'bottom middle', 'bottom right']];
console.log(grid[1][2]); // bottom right
```
    - a single array where (x, y) = x + (y * width)
```javascript
var grid = ['top left', 'top middle', 'top right',
            'bottom left', 'bottom middle', 'bottom right'];
console.log(grid[2 + (1 * 3)]); // bottom right
```
- we will use the latter method

###A Critter's Programming Interface
