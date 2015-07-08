#Mozilla Developer Network Pages
*The following are excerpts (or downright copy/pastes) from MDN*

**Object.getPrototypeOf()**
- The Object.getPrototypeOf() method returns the prototype (i.e. the value of the internal [[Prototype]] property) of the specified object.
```
Object.getPrototypeOf(obj)
```
- Parameters
    - obj
        - The object whose prototype is to be returned

**Object.create()**
- The Object.create() method creates a new object with the specified prototype object and properties.
```
Object.create(proto[, propertiesObject])
```
- Parameters
    - proto
        - The object which should be the prototype of the newly-created object
    - propertiesObject
        - Optional. If specified and not ```undefined```, an object whose enumerable own properties (that is, those properties defined upon itself and *not* enumerable properties along its prototype chain) specify property descriptors to be added to the newly-created object, with the corresponding property names. These properties correspond to the second argument of Object.defineProperties().
- Throws
    - Throws a TypeError exception if the proto parameter isn't null or an object.

**Object.keys()**
- the Object.keys() method returns an array of a given object's own enumerable properties, in the same order as that provided by a ```for...in``` loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
```
Object.keys(obj)
```
- Parameters
    - obj
        - The object whose enumerable own properties are to be returned

**getter**
- The get syntax binds an object property to a function that will be called when that property is looked up.
```
{get prop() { ... } }
{get [expression]() { ... } }
```
- Parameters
    - prop
        - The name of the property to bind to the given function
    - expression
        - Starting with ECMAScript 6, you can also use expressions for a computed property name to bind to the given function

**setter**
- The set syntax binds an object property to a function to be called when there is an attempt to set that property.
```
{set prop(val) { ... } }
{set [expression](val) { ... } }
```
- Parameters
    - prop
        - The name of the property to bind to the given function
    - val
        - An alias for the variable that holds the value attempted to be assigned to prop
    - expression
        - Starting with ECMAScript 6, you can also use expressions for a computed property name to bind to the given function

**instanceof**
- The instanceof operator tests whether an object has in its prototype chain the prototype property of a constructor
```
object instanceof constructor
```
- Parameters
    - object
        - The object to tests
    - constructor
        - Function to test against

**String.prototype.split()**
- The split() method splits a String object into an array of strings by separating the string into substrings. Returns new array.
```
str.split([separator[, limit]])
```
- Parameters
    - separator
        - Optional. Specifies the character(s) to use for separating the string. The separator is treated as a string or a regular expression. If separator is omitted, the array returned contains one element consisting of the entire string. If separator is an empty string, str is converted to an array of characters.
        - When found, separator is removed from the string and the substrings are returned in an array.
    - limit
        - Optional. Integer specifying a limit on the number of splits to be found. The split() method still splits on every match of separator, but it truncates the returned array to at most limit elements.

**Array.prototype.join()**
- The join() method joins all elements of an array into a string.
```
str = arr.join([separator = ','])
```
- Parameters
    - separator
        - Optional. Specifies a string to separate each element of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma. If separator is an empty string, all elements are joined without any characters in between them.
- if one element is undefined or null, it is converted to the empty string.
