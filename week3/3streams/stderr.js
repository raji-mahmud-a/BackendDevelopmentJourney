// Write to stderr
process.stderr.write('Error: Something went wrong!\n');

// console.error uses stderr
console.error('This is an error message');

// Separate normal output from errors
process.stdout.write('Normal message\n');
process.stderr.write('Error message\n');
