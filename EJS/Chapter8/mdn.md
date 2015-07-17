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
