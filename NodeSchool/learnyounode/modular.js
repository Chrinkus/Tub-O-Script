var mymodule = require('./mymodule');
var dir = process.argv[2];
var ext = process.argv[3];

mymodule(dir, ext, function logEm(err, data) {
    if (err) {
        console.log('Oh mah gawd!');
    }
    data.forEach(function (file) {
        console.log(file);
    })
})
