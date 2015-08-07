var landscape = function() {
    var result = ''; // local to landscape function and all inner f's
    var flat = function(size) {
        for (var count = 0; count < size; count++) { // local count
            result += '_';
        }
    };
    var mountain = function(size) {
        result += '/';
        for (var count = 0; count < size; count++) { // new local count
            result += "'";
        }
        result += '\\';
    };

    flat(3); // each call accesses samre result var using separate counts
    mountain(4);
    flat(6);
    mountain(1);
    flat(1);
    return result;
};

console.log(landscape());
