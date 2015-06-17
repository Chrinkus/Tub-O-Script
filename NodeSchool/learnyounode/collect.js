// HTTP Collect

var http = require('http');
var feed = '';
var chars = 0;

http.get(process.argv[2], function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
        chars += data.length;
        feed += data;
    })
    response.on('end', function () {
        console.log(chars);
        console.log(feed);
    })
})
