#Chapter 1 - Values, Types, and Operators

6 basic types of Values
- numbers
- strings
- Booleans
- objects
- functions
- undefined Values

Numbers
- 64 bit - binary
- 2e64 different numbers
- math follows bedmas
- modulo % used to calculate the remainder of a division
    - same precedence as multiplication and division
    - ex: 314 % 100 = 14
- special numbers
    - Infinity and -Infinity (+/-)
    - NaN - "not a number"
        - number type that defines a non-number
        - NaN != NaN

Strings
- text
- "this is a string"
- 'this is also a string'
- \ is used to escape certain characters for effect
- the newline 'n' must be escaped
    - \n
    - 'this is on one line\nand this is on the next'
- to express 'the newline code is "\n"' you must escape a lot
    - 'the newline code is \"\\\\n\"' //> affected by markdown

Unary Operators
- operates on only a single value
- 'typeof' takes a single value and returns its type as a string
    - typeof 37 //> number
    - typeof 'jello' //> string
    - typeof true //> Boolean
- '-' can be a unary or binary operator
    - binary: 3 - 2 = 1
    - unary: -18 //> negative 18

Boolean Values
- true or false
    - 3 > 2 //> true
    - 3 < 2 //> false
- comparisons
    - > greater than
    - < less than
    - >= greater than or equal to
    - <= less than or equal to
    - == equal to
    - != not equal to
        - these last two use double symbols but are harder to work with
        - prefer to use === and !==
            - see falsy below
    - strings are comparable alphabetically
        - uppercase < lowercase
- Logical Operators
    - && - and
    - || - or
    - ! - not (unary as in !true === false)

Ternary Operator
- conditional operator
- <condition> ? <if true> : <if false>

The Grand Order
- high ()e /%* +- ><== && || low

Undefined Values
- undefined & null
- undefined is the value given to an initialized variable that is unassigned
- null is similar
    - null is a value we pass when we don't want to pass an actual value

Automatic Type Conversion
- JS often accepts bad expressions and attempts to convert them
    - type coercion - protect against it
- falsy
    - 0, NaN, "", null, undefined all == false but do not === false

Short-Circuiting
- && and || evaluate left side first then right if necessary
- the right side of || can be used as a fall back when left side is false
- && will ignore right side and return left if left is false
    - if left is true then right is returned whether true or false

END OF CHAPTER
