// EJS Faulty function
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure();
    }
}

function reliableMultiply(a, b) {
    // my code
}

// EJS Test
console.log(reliableMultiply(8, 8)); // 64
