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
- there are a number of common character groups that have built in shortcuts using \
| Shortcut | Represents |
| :------------- | :------------- |
| \d | Any digit character |
| \w | Any alphanumeric character |
| \s | Any whitespace character (space, tab, newline, etc) |
| \D | Any NON-digit |
| \W | Any non-alphanumeric |
| \S | Any non-whitespace |
| . | Any character except newline |
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
