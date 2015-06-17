var fs = require('fs');
var path = require('path');

var dir = process.argv[2];
var ext = process.argv[3];

fs.readdir(dir, function logFiles(err, list) {
    for (var i = 0; i < list.length; i++) {
        if (path.extname(list[i]) === ('.' + ext)) {
            console.log(list[i]);
        }
    }
})
/*
var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2], function (err, list) {
    list.forEach(function (file) {
        if (path.extname(file) === '.' + process.argv[3]) {
            console.log(file);
        }
    })
})
*/
