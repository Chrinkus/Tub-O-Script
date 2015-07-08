#Analysis of table.js Execution
The example worked through in the chapter requires close examination to understand. There are different methods of inheritance and many higher-order function processes.

##dataTable
The data from mountains.js enters the program as an array of objects organized as such:
```javascript
[{name: 'Mountain', height: 1337, country: 'Mountain Land'}, { ... }]
```
An array named keys is formed of strings of the property names using Object.keys():
```javascript
var keys = ['name', 'height', 'country']
```
The header row is created as UnderlinedCell-wrapped TextCell objects.

##drawTable
