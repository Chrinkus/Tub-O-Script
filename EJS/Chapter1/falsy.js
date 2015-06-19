// Demonstrates short-circuiting of logical operators

console.log('chris' || 'chrinkus'); // returns left
console.log('' || 'xbox'); // returns right
console.log('wii' || null); // returns left
console.log(0 || ''); // returns right

console.log('chris' && 'chrinkus'); // returns right
console.log('' && 'xbox'); // returns left
console.log('wii' && null); // returns right
console.log(0 && ''); // returns left
