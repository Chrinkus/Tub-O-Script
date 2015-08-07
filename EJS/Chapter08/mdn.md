#Mozilla Developer Network Pages
*The following are excerpts (or downright copy/pastes) from MDN*

**throw**
- The throw statement throws a user-defined exception. Execution of the current function will stop (the statements after ```throw``` won't be executed), and control will be passed to the first ```catch``` block in the call stack. If no catch block exists among caller functions, the program will terminate.
```
throw expression;
```
- expression
    - the expression to throw

**Error**
- The Error constructor creates an error object. Instances of Error objects are thrown when runtime errors occur. The Error object can also be used as base objects for user-defined exceptions.
```
new Error([message[, fileName[, lineNumber]]])
```
- Parameters
    - message
        - Optional. Human-readable description of the error.
    - fileName
        - Optional. The value for the fileName property on the created Error object. Defaults to the name of the file containing the code that called the Error() constructor.
    - lineNumber
        - Optional. The value for the lineNumber property on the created Error object. Defaults to the line number containing the Error() constructor invocation.
- Error.prototype contains its own toSource() and toString() methods as well as the properties: constructor, message, and name.

**Error.prototype.stack**
- The non-standard stack property of Error objects offers a trace of which functions were called, in what order, from which line and file, and with what arguments. The stack string proceeds from the most recent calls to earlier ones, leading back to the original global scope call.

**try...catch**
- The try...catch statement marks a block of statements to try, and specifies a response, should an exception be thrown.
```
try {
    try_statements
}
[catch (exception_var_1 if condition_1) { // non-standard
    catch_statements_1
}]
...
[catch (exception_var_2) {
    catch_statements_2
}]
[finally {
    finally_statements
}]
```
- Legend
    - try_statements
        - The statements to be executed.
    - catch_statements_1, catch_statements_2
        - Statements that are executed if an exception is thrown in the try block.
    - exception_var_1, exception_var_2
        - An identifier to hold an exception object for the associated catch clause.
    - condition_1
        - A conditional expression.
    - finally_statements
        - Statements that are executed after the try statement completes. These statements execute regardless of whether or not an exception was thrown or caught.
- There are 3 forms of the try statement
    - try...catch
    - try...finally
    - try...catch...finally

**for**

*Specifically regarding the optional use of expressions*
- The for statement creates a loop that consists of three optional expressions, enclosed in parenthesis and separated by semicolons, followed by a statement or a set of statements executed in the loop.
```
for ([initialization]; [condition]; [final-expression])
    statement
```
- Legend
    - initialization
        - An expression (including assignment expressions) or variable declaration. Typically used to initialize a counter variable. This expression may optionally declare new variables with the var keyword. These variables are not local to the loop, i.e. they are in the same scope the for loop is in. The result of this expression is discarded.
    - condition
        - An expression to be evaluated before each loop iteration. If this expression evaluates to true, statement is executed. This conditional test is optional. If omitted, the condition always evaluates to true. If the expression evaluates to false, execution skips to the first expression following the construct.
    - final-expression
        - An expression to be evaluated at the end of each loop iteration. This occurs before the next evaluation of condition. Generally used to update or increment the counter variable.
    - statement
        - A statement that is executed as long as the condition evaluates to true. To execute multiple statements within the loop, use a block statement ({...}) to group those statements. To execute no statement within the loop, use an empty statement (;).
- Optional ```for``` expressions
    - optional initialization block
```javascript
var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
}
```
- optional condition block
    - if omitting the conditional you must provide means of breaking the loop in the body
```javascript
for (var i = 0;; i++) {
    console.log(i);
    if (i > 3) break;
    // more statements
}
```
- all three blocks omitted. Must provide means of breaking and modification of a variable.
```javascript
var i = 0;

for (;;) {
    if (i > 3) break;
    console.log(i);
    i++;
}
```
