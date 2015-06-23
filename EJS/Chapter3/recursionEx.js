// ESJ Ch 3 - Recursion

function findSolution(target) {
    function find(start, history) {
        if (start == target) {
            return history;
        } else if (start > target) {
            return null;
        } else {
            return find(start + 5, "(" + history + " + 5)") ||
                   find(start * 3, "(" + history + " * 3)");
        }
    }
    return find(1, "1");
}

console.log(findSolution(24));

/*
find(1, "1") // start
    find(1 + 5, "(1 + 5)") // 6
        find(6 + 5, "(6 + 5)") // 11
            find(11 + 5, "(11 + 5)") // 16
                find(16 + 5, "(16 + 5)") // 21
                    find(21 + 5, "(21 + 5)") // 26 > target = null
                find(16 * 3, "(16 * 3)") // 48 > target = null
            find(11 * 3, "(11 * 3)") // 33 > target = null
        find(6 * 3, "(6 * 3)") // 18
            find(18 + 5, "(18 + 5)") // 23
                find(23 + 5, "(23 + 5)") // 28 > target = null
            find(18 * 3, "(18 * 3)") // 54 > target = null
        null
    find(1 * 3, "(1 * 3)") // 3
        find(3 + 5, "(3 + 5)") // 8
            find(8 + 5, "(8 + 5)") // 13
                find(13 + 5, "(13 + 5)") // 18
                    find(18 + 5, "(18 + 5)") // 23
                        find(23 + 5, "(23 + 5)") // 28 > target = null
                    find(18 * 3, "(18 * 3)") // 54 > target = null
                find(13 * 3, "(13 * 3)") // 39 > target = null
            find(8 * 3, "(8 * 3)") // 24 == target return history
*/
