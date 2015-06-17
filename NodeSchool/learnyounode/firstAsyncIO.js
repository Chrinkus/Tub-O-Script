var fs = require('fs');

fs.readFile(process.argv[2], 'utf-8', function logLines(err, data) {
  console.log(data.split('\n').length - 1);
})
// backwards escape really fucked me
