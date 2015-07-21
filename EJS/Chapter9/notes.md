#Chapter 9 - Regular Expressions

- Regular Expressions or RegExp's are patterns used to match character combinations in strings.

###Creating a Regular Expression
- A RegExp is a type of object
    - can be written using a constructor or as a literal value
```javascript
var re1 = new RegExp('abc'); // constructor
var re2 = /abc/; // literal
```
- both of the above objects represent the same pattern
    - an 'a' followed by a 'b' followed by a 'c'
- the constructor is written as a normal string so normal escapes apply
- the literal starts and ends with forward slashes so they must be escaped if meant to be part of the pattern
    - there are also many character codes that use backslashes
        - if not part of one of these situations, the \ will be preserved in the pattern not ignored
    - many usual characters have special meanings and must be escaped by a \
```javascript
var eighteenPlus = /eighteen\+/;
```
- MUST learn the 'book' of special character codes ASAP

###Testing for Matches
- The RegExp object has a number of methods
    - most useful is ```test```
        - pass it a string and it will return a boolean verifying whether the string matches the pattern
```javascript
console.log(/abc/.test('abcde')); // true
console.log(/abc/.test('abxde')); // false
```
- the above regexp will match any instance of 'abc' in a string
    - not just at the beginning

###Matching a Set of Characters
- a set of characters between square brackets will match any of the characters within
```javascript
console.log(/[0123456789]/.test('in 1992')); // true
console.log(/[0-9]/.test('in 1992')); // true
```
- Inside square brackets a dash between two characters represents a range
    - the ordering is determined by the character's Unicode number
- there are a number of common character groups that have built in shortcuts using '\\'
    - \d - Any digit character
    - \w - Any alphanumeric character
    - \s - Any whitespace character (space, tab, newline, etc)
    - \D - Any NON-digit
    - \W - Any non-alphanumeric
    - \S - Any non-whitespace
    - . - Any character except newline
- lowercase are inclusive, uppercase are exclusive
- when used between square brackets the period (.) loses its special meaning as do other similar chars
    - [\d.] means any digit or a period character
- to invert a set of characters use the caret (^) after the opening bracket
```javascript
var notBinary = /[^01]/; // does it contain anything other than [01]
console.log(notBinary.test('1100100001001010100')); // false
console.log(notBinary.test('110110102001010')); // true
```

###Repeating Parts of a Pattern
- placing a plus (+) after something in a regexp it indicates the element may be repeated more than once
```javascript
console.log(/'\d+'/.test("'123'")); // true
console.log(/'\d+'/.test("''")); // false
console.log(/'\d*'/.test("'123'")); // true
console.log(/'\d*'/.test("''")); // true
```
- the star (\*) has a similar meaning but also allows the pattern to match zero times
- a question mark indicates a part of the pattern is optional
    - it may occur zero or one time
```javascript
var neighbor = /neighbou?r/; // u is allowed but not necessary
console.log(neighbor.test('neighbour')); // true
console.log(neighbor.test('neighbor')); // true
```
- to be more precise about the number of repetitions we use braces ({})
    - a {4} after an element requires it to occur exactly 4 times
    - we can specify a range using {2,4} (no spaces)
        - element must occur 2 times but no more than 4 times
```javascript
var dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test('30-1-2003 8:45')); // true
```
- finally, we can define open-ended ranges by omitting either side of the comma
    - {,5} means zero to 5 times
    - {5,} means five or more times

###Grouping Subexpressions
- to use an operator (\* or +) on more than one element in the same expression we use parentheses
```javascript
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test('Boohoohooohoo')); // true
```
- when following a letter as in the ```+``` after boo and hoo the operator applies to that letter
    - when following a closing parentheses as in the final '+' the whole group within may be matched
- the ```i``` at the end of the regexp makes the matching pattern case-insensitive
    - thats how the capital 'B' matches

###Matches and Groups
- the ```test``` method is a simple way to match a regexp
    - returns true or false and nothing else
- regexp's also have an ```exec``` method
    - returns null if no match is found
    - returns an object with information about the match if it does
```javascript
var match = /\d+/.exec('one two 100');
console.log(match); // ['100']
console.log(match.index); // 8
```
- strings have a ```match``` method that behaves similarly
```javascript
console.log('one two 100'.match(/\d+/)); // ['100']
```
- the array that exec() returns always contains the whole match as the first element
    - any subexpression matches follow as additional indexes
```javascript
var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // ["'hello'", "hello"]
```
- When a group does not end up being matched, its position in the output array will hold ```undefined```
    - if a group matches multiple times, only the last match ends up in the array
```javascript
console.log(/bad(ly)?/.exec('bad')); // ["bad", undefined]
console.log(/(\d)+/.exec("123")); // ["123", "3"]
```
- exec() is great for extracting substrings and working with them

###The Date Type
- Date is an object type
    - creating a Date object using ```new``` produces the current date and time
```javascript
console.log(new Date());
// Mon Jul 20 2015 21:53:27 GMT-0500 (CDT)
```
