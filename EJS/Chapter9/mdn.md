#Mozilla Developer Network Pages
*The following are excerpts (or downright copy/pastes) from MDN*

**RegExp.prototype.test**
- The test() method executes a search for a match between a regular expression and a specified string. If called multiple times on the same global regular expression will advance past the previous match.
```
regexObj.test(str)
```
- Parameters
    - str
        - The string against which to match the regular expression
- Returns
    - boolean true or false

**RegExp.prototype.exec**
- The exec() method executes a search for a match in a specified string. Returns a result array, or null.
```
regexObj.exec(str);
```
- Parameters
    - str
        - The string against which to match the regular expression.
- Returns
    - If the match succeeds, the exec() method returns an array and updates properties of the regular expression object. The returned array has the matched text as the first item, and then one item for each capturing parenthesis that matched containing the text that was captured.
    - If the match fails, null is returned
- Example
```javascript
// Match 'quick brown' followed by 'jumps', ignoring characters in between
// Remember 'brown' and 'jumps'
// Ignore case
var regexObj = /quick\s(brown).+?(jumps)/ig;
var result = regexObj.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```
- the variable result in the above script contains
    - [0]
        - The full string of characters matched
            - Quick Brown Fox Jumps
    - [1], ...[n ]
        - The parenthesized substring matches, if any. Unlimited number.
            - [1] = Brown
            - [2] = Jumps
    - index
        - the index of the match in the string
            - 4
    - input
        - the original string
            - The Quick Brown Fox Jumps Over The Lazy Dog

**String.prototype.match**
- The match() method retrieves the matches when matching a string against a regular expression.
```
str.match(regexp)
```
- Parameters
    - regexp
        - A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using ```new RegExp(obj)```.
- Returns
    - An array containing the matched results or null if there were no matches.

**Date.prototype**
- The Date.prototype property represents the prototype for the Date constructor.
```
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
```

**String.prototype.replace**
- The replace() method returns a new string with some or all matches of a pattern replaced by a ```replacement```. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match.
```
str.replace(regexp|substr, newSubstr|function[, flags])
```
- Parameters
    - regexp (pattern)
        - a RegExp object. The match is replaced by the return value of parameter \#2
    - substr (pattern)
        - A String that is to be replaced by newSubstr.
    - newSubstr (replacement)
        - the String that replaces the substring received from parameter \#1. A number of special replacement patterns are supported.
    - function (replacement)
        - A function to be invoked to create the new substring (to put in place of the substring received from parameter \#1).
            - arguments
                - match - the matched substring
                - p1, p2, ... pn - The nth parenthesized submatch string, provided the first argument to replace() was a RegExp object. (Corresponds to $1, $2, etc)
                - offset - The zero-indexed location of the matched substring within the total string being examined
                - string - the total string being examined
    - flags
        - a string specifying a combination of regular expression flags
            - don't do this

**String.prototype.search**
- The search() method executes a search for a match between a regular expression and this String object.
```
str.search(regexp)
```
- Parameters
    - regexp
        - A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using ```new RegExp(obj)```.
- If successful, search() returns the index of the first match of the regular expression inside the string. Otherwise, it returns -1.
