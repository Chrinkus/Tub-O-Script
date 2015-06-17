var net = require('net');

var server = net.createServer(function (socket) {
    var stamp = new Date(Date.now()),
        year = stamp.getFullYear(),
        month = ('0' + (stamp.getMonth() + 1)).slice(-2),
        day = ('0' + (stamp.getDate())).slice(-2),
        hour = ('0' + (stamp.getHours())).slice(-2),
        min = ('0' + (stamp.getMinutes())).slice(-2);

    var output = year + '-' + month + '-' + day + ' ' + hour + ':' + min + '\n';
    socket.end(output);
})
server.listen(process.argv[2]);
