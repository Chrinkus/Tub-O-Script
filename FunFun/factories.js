/* Factory Functions in Javascript - 14 Sept 2015
 *
 * To be used with composition.js
 */

/*
// Bad Class
class Dog {
    constructor() {
        this.sound = "woof";
    }
    talk() {
        console.log(this.sound);
    }
}
const sniffles = new Dog();
sniffles.talk(); // woof

$("button.myButton")
    //.click(sniffles.talk);                // bad "this" ref
    //.click(sniffles.talk.bind(sniffles)); // fixed "this", uglyAF
    .click(_ => sniffles.talk())            // shorter != acceptable
*/

// Factory alternative
const dog = () => {
    const sound = "woof";
    return {
        talk: () => console.log(sound)
    }
}
const sniffles = dog();
sniffles.talk();

$("button.myButton")
    .click(sniffles.talk);  // Works!
