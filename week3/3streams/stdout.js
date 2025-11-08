console.log(process.stdout)

// These are equivalent:
process.stdout.write('Hello World\n');
console.log('Hello World');

// stdout is a writable stream
process.stdout.write('Loading');
setTimeout(() => process.stdout.write('...\n'), 1000);

//process.stdout.end("cool")
