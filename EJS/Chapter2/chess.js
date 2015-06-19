var size = 8, board = '';

for (var i = 1; i <= size; i++) {
    var row = i % 2 === 0 ? ' ' : '#';
    for (var n = 0; row.length < size; n++) {
        row += row[n] === '#' ? ' ' : '#';
    }
    board += row;
    board += '\n';
}
console.log(board);
