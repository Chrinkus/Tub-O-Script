function countChar(str, char) {
    var beanCounter = 0;
    for(var i = 0; i < str.length; i++) {
        if (str.charAt(i) === char) {
            beanCounter += 1;
        }
    }
    return beanCounter;
}

function countBs(str) {
    return countChar(str, 'B');
}

console.log(countBs('BuBBles'));
console.log(countChar('Mississippi', 's'));
