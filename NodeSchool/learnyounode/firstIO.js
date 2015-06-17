var fs = require('fs');
var buf = fs.readFileSync(process.argv[2].toString());
var str = buf.toString();
var strArr = str.split('\n');
console.log(strArr.length -1);

/*
var fs = require('fs');

var contents = fs.readFileSync(process.argv[2]);
var lines = contents.toString().split('\n').length - 1;
console.log(lines);

//fs.readFileSync(process.argv[2], 'utf8').split('/n').length - 1;
*/
