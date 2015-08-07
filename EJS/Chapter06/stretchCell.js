// Solution appended to bottom of table.js

// EJS tests
var sc = new StretchCell(new TextCell('abc'), 1, 2);
console.log(sc.minWidth()); // 3
console.log(sc.minHeight()); // 2
console.log(sc.draw(3, 2)); // ['abc', '   ']
