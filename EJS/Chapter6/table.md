#Analysis of table.js Execution
The example worked through in the chapter requires close examination to understand. There are different methods of inheritance and many higher-order function processes.

##Higher-Order Constructs
There are a few specific implementations of functions in the creation of this table that bear examination.

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
