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
*Code examples found in date.js*
- Date is an object type
    - creating a Date object using ```new``` produces the current date and time
    - can pass arguments to create an object for a specific time
        - single numeric arg - number of milliseconds after unixtime
            - the ```getTime``` method produces the number of milliseconds from unixtime for the Date object it is called upon
        - two numeric args - year, month w/00:00:00 for the time
            - **Important** - month is zero-index based, all others start at 1
                - Jan = 0, Feb = 1, Mar = 2, etc...
        - three plus args - year, month, day, hour, minutes, seconds, milliseconds
    - a date-string may be passed so long as it conforms to one of two specs
        - RFC 2822
            - year, month, day in any order separated by a space
                - month as word accepted in any order, as number only after year
                - time as 00:00:00
        - ISO8601
            - defaults to UTC then adjusts to local time
            - YYYY-MM-DDTHH:mm:ss.sssZ
                - "T" is literal used to signify beginning of the time section
            - Z is time-zone offset
                - may be appended as 'GMT-05:00' or 'GMT+02:30' to shorter versions of above pattern
    - Date objects provide getter methods for each component
        - getFullYear, getMonth, getDate, getHours, getMinutes, getSeconds

###Word and String Boundaries
- We can enforce that the match must span the whole string with ^ and $
    - the caret (^) indicates the beginning of the string
    - the dollar sign ($) indicates the end of a string
        - so ```/^\d+$/``` matches a string consisting of 1 or more digits
        - ```/^!/``` matches any string that begins with an exclamation mark
- we can also specify a word boundary with ```\b```
    - a word boundary can be the beginning or end of a string or any point where a word character, ```\w```, neighbors a non-word character
    - a boundary marker does not represent a character, just a type condition
```javascript
console.log(/cat/.test('concatenate')); // true
console.log(/\bcat\b/.test('concatenate')); // false
```

###Choice Patterns
- to have a pattern accept different options we can use the pipe (|) to separate the possible choices
```javascript
var animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test('15 pigs')); // true
console.log(animalCount.test('15 pigchickens')); // false
```

###The Mechanics of Matching
- the flow through the above choice pattern code is involved
    - at the 'choice' the expression will go as far as it can through each option till it finds its first match
        - if multiple paths can be successful only the first will match and satisfy the test

###Backtracking
```javascript
/\b([01]+b|\d+|[\da-f]h)\b/
```
- the above matches either a binary number followed by a 'b', a decimal number, or a hexadecimal number follwed by an 'h'
    - when matching a type of number value to this expression the branches will be tested from left to right until a match is found or all three reject the string
```javascript
/^.*x/
```
- when evaluating the above expression, each element will be tested on the entire string until it moves on
    - the ```.*``` will try to match the whole string before realizing it needs to find an 'x' as well
        - the star will reach the end of the string then work backwards looking for an 'x' one character at a time
            - this is backtracking
- due to backtracking some regexp's can end up taking a long time to evaluate
    - ```/([01]+)+b/``` is a test for a binary number that can loop over on itself many times

###The replace Method
- the replace method of the String.prototype replaces part of a string with another string
```javascript
console.log('papa'.replace('p', 'm')); // mapa
```
- the first argument can also be a regular expression
- to change more than the first match we can add the 'g' or global flag to replace all matches
```javascript
console.log('Borobudur'.replace(/[ou]/, 'a')); // Barobudur
console.log('Borobudur'.replace(/[ou]/g, 'a')); // Barabadar
```
- using regexp's with the replace() method allows us to refer back to matched groups
```javascript
console.log('Hopper, Grace\nMcCarthy, John\nRitchie, Dennis'
            .replace(/([\w ]+), ([\w ]+)/g, '$2 $1'));
// Grace Hopper
// John McCarthy
// Dennis Ritchie
```
- the '$' in the above code can be used to refer to the mathced groups in the pattern
    - can use $1, $2, up to $9
    - $& refers to the whole match
- examples of using a function as the second argument to replace() are found in regexp.js
    - the important thing is knowing which arguments will be passed to the callback

###Greed
- due to the nature of backtracking, the repetition operators in regexp's are greedy
    - repetition operators - +, \*, ?, and {}
    - they try to match the whole string then move back from there, taking as much as they can
```javascript
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, '');
}
console.log(stripComments('1 + /* 2 */3')); // 1 + 3
console.log(stripComments('x = 10;// ten!!')); // x = 10;
console.log(stripComments('1 /* a */+/* b */ 1')); // 1 1
```
- in the last case, [^]* consumes the entire string then backtracks looking for the closing '\*/'
    - it hits on the second block comment closer and returns victorious
- to make a repetition operator non-greedy apply a question mark after them to make them match as little as possible
    - +?, \*?, ??, {}?
```javascript
function stripComments(code) {
    return code.replace(/\/\/.*[^]*?\*\//g, '');
}
```
- this is a common cause of many bugs with RegExp's

###Dynamically Creating RegExp Objects
*Examples in the regexp.js file*
- can use variables in a regexp constructor to build patterns off of unknown strings
- when constructing regexp's from a string, remember to escape special sequences

###The search Method
- The ```indexOf``` method on strings cannot be called with a regular expression
    - the method ```search()``` can be used instead
        - similar to indexOf it returns the index at which the regexp match occurs or -1
```javascript
console.log('  word'.search(/\S/)); // 2
console.log('   '.search(/\S/)); // -1
```
- unlike indexOf there is no way to start the search at a given offset, however..

###The lastIndex Property
- the exec method does have a way to start at a given offset but not a very convenient one
    - all RegExp objects have properties
        - source - string that expression was created from
        - lastIndex - controls where the next match will start from
            - only when global (g) option is enabled
            - only through the exec method
```javascript
var pattern = /y/g;
pattern.lastIndex = 3;
var match = pattern.exec('xyzzy');
console.log(match.index);
//> 4
console.log(pattern.lastIndex);
//> 5
```
- if the match was successful, exec automatically updates lastIndex to the point after the match
    - if no match was found, lastIndex is reset to 0 (default)
- when using the 'g' option for multiple exec calls, the auto updates may cause problems
```javascript
var digit = /\d/g;
console.log(digit.exec('here it is: 1'));
//> ["1"]
console.log(digit.exec('and now: 1'));
//> null
```
- the global option also affects how String.prototype.match works
    - with 'g' enabled, mathc will return an array with all matches from a string
- the only times we need to use 'g' is calls to replace and when we NEED to use lastIndex

###Looping Over Matches
- we can use the lastIndex updating mechanism of exec as an iterator in a loop
```javascript
var input = 'A string with 3 numbers in it... 42, and 88.';
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input)) {
    console.log('Found', match[1], 'at', match.index);
}
//> Found 3 at 14
//> Found 42 at 33
//> Found 88 at 40
```

###Parsing an INI File
