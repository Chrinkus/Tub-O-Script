for (var i = 1; i <= 100; i++) {
    var fizzString = '';
    if (i % 3 === 0) {
        fizzString += 'Fizz';
    }
    if (i % 5 === 0) {
        fizzString += 'Buzz';
    }
    console.log(fizzString || i);
}
// remembered from when I first got the book
