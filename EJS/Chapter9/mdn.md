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
