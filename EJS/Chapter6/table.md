#Analysis of table.js Execution
The table example worked through in the chapter requires closer examination to be fully understood. There are different models of inheritance and many higher-order function processes.

##Higher-Order Constructs
There are a few specific implementations of functions in the creation of this table that are slightly different than other work from the book.

The map() function is used frequently in slightly different contexts but always as a means of separating data for further process. Of particular interest is in the dataTable() function where two consecutive map()'s are employed to pick apart an array of objects.

The reduce() function is used alongside the Math.max() function for sizing rows and cells to the greatest .length value of adjacent sets. Often an initial value of zero is passed which is tucked away at the end of the call.

##dataTable
The data from mountains.js enters the program as an array of objects organized as such:
```javascript
[{name: 'Mountain', height: 1337, country: 'Mountain Land'}, { ... }]
```
An array named keys is formed of strings of the property names using Object.keys():
```javascript
var keys = ['name', 'height', 'country']
```
The header row is created as UnderlinedCell-wrapped TextCell objects. This is one method of achieving inheritance and the recommended way by the author.
```javascript
var headers = [UnderlinedCell(TextCell('name')),
               UnderlinedCell(TextCell('height')),
               UnderlinedCell(TextCell('country'))]
```
The body of the table is organized next. A double map construct is used to access each property of each data-array object, assigning appropriate constructors according to data-type. Each object is referred to as a row and the keys array is used to access each property.
The String() global object call ensures the data passed to the constructors is of String type even numbers (to RTextCell).
```javascript
var body = [[TextCell('Kilimanjaro'), RTextCell('5895'), TextCell('Tanzania')],
            [TextCell('Everest'), RTextCell('8848'), TextCell('Nepal')],
            [etc...]]
```
Finally, this line is returned to the drawTable() method:
```javascript
return [headers].concat(body)
```
The extra array 'level' that surrounds headers ensures that headers is passed as an array-row to drawTable().

The RTextCell constructor is written with more of a direct inheritance model by actually setting RTextCell's prototype to TextCell. This is the seemingly more common method of attaining inheritance.

In this case, the two constructors are virtually identical in purpose with the only difference being how they are padded. Though not a trivial feature it only requires the alteration of one method. This level of direct association lends itself well to the applied inheritance model.

##drawTable
The drawTable function takes the output of the dataTable function as its only parameter. That argument, rows, is an array of 3 element arrays. Each element of the inner arrays are variations of the TextCell.
```javascript
// rows
[ [ { inner: [Object] }, { inner: [Object] }, { inner: [Object] } ],
  [ { text: [Object] }, { text: [Object] }, { text: [Object] } ],
  [ { text: [Object] }, { text: [Object] }, { text: [Object] } ] ]
```
###rowHeights & minHeight
The first statement of drawTable() defines a variable, heights, to hold the maximum height required for each row using reduce() with Math.max() and accessing the minHeight() method of the cell.
```javascript
var heights = [2, 1, 1, 1, ..., 1];
```
Looking at the ```this.text.length``` call of TextCell.prototype.minHeight to define height seems incorrect at first glance as text.length should be a lateral measurement of the string. However, the base constructor of TextCell uses the String.prototype.split() function to set the value of the text property to an ARRAY containing the text string.
```javascript
rows[1][2] = { text: ['Tanzania'] }
```
So ```this.text.length``` returns the length of the array (1).

###colWidths & minWidth
The second statement finds the largest required width of each column. While rowHeights could work on each 'row' array individually, each element shares a column not with its immediate array siblings but with the elements of the other arrays that share the same index position.
The colWidths function uses the second argument to map to isolate the current index of the 'row' element. By specifying row[0] in the map call, the map function will only be called 3 times, once for each element of the inner arrays. Reduce is then called on the entire 'rows' array but only looking at the same index as the current map call.
```javascript
var widths = [12, 6, 13];
```
Examining the call to the minWidth method reveals an extra call to reduce within it. This extra call is in case there are multiple values in the text property array, though none of these situations exist in the data set.
