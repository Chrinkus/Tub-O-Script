var MOUNTAINS = require('./mountains');

// rows argument holds an array of arrays with each inner array representing a row of cells
function rowHeights(rows) {
    return rows.map(function(row) { // map each row
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function(_, i) { // _ variable name indicates an unused argument
        return rows.reduce(function(max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(function(block) {
            return block[lineNo];
        }).join(' '); // gap between columns
    }
    function drawRow(row, rowNum) {
        var blocks = row.map(function(cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map(function(_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join('\n');
    }

    return rows.map(drawRow).join('\n');
}

function repeat(string, times) { // padding function
    var result = '';
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

// cell constructor
function TextCell(text) {
    this.text = text.split('\n');
}
TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
        return Math.max(width, line.length);
    }, 0);
};
TextCell.prototype.minHeight = function() {
    return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || '';
        result.push(line + repeat(' ', width - line.length));
    }
    return result;
};

/* test grid
var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++) {
        if ((j + i) % 2 == 0) {
            row.push(new TextCell('##'));
        } else {
            row.push(new TextCell('  '));
        }
    }
    rows.push(row);
}
console.log(drawTable(rows)); // nice!!
*/

function UnderlinedCell(inner) {
    this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1).concat([repeat('-', width)]);
};

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row) {
        return keys.map(function(name) {
            var value = row[name];
            if (typeof value == 'number') {
                return new RTextCell(String(value));
            } else {
                return new TextCell(String(value));
            }
        });
    });
    return [headers].concat(body);
}

function RTextCell(text) {
    TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || '';
        result.push(repeat(' ', width - line.length) + line);
    }
    return result;
};

console.log(drawTable(dataTable(MOUNTAINS)));
/*
var pile = {
    elements: ['eggshell', 'orange peel', 'worm'],
    get height() {
        return this.elements.length;
    },
    set height(value) {
        console.log('Ignoring attempt to set height to ', value);
    }
};
console.log(pile.height); // 3
pile.height = 100; // Ignoring attempt to set height to 100

Object.defineProperty(TextCell.prototype, 'heightProp', {
    get: function() { return this.text.length; }
});
var cell = new TextCell('no\nway');
console.log(cell.heightProp); // 2
cell.heightProp = 100;
console.log(cell.heightProp); // 2
*/
