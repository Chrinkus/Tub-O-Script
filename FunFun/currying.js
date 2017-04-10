/* Functional Programming in JavaScript 6
 *
 * 17 Aug 2015 - Currying
 *
 * "..when a function doesn't use all of its arguments up front, instead it
 * is called with the first argument and returns a function that you will call
 * with the second argument.." and so on
 */

/*
let dragon = (name, size, element) => 
    name + " is a " +
    size + " dragon that breathes " +
    element + "!"
*/

let dragon =
    name =>
        size =>
            element=>
                name + " is a " +
                size + " dragon that breathes " +
                element + "!"

//console.log(dragon("fluffykins")("tiny")("lightning"))

let fluffykinsDragon = dragon("fluffykins")
let tinyDragon = fluffykinsDragon("tiny")

console.log(tinyDragon("lightning"))
