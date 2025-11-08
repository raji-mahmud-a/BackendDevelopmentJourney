process.stdin.on('data', (data) => {
  console.log('You typed:', data.toString().trim());
});


/*
Interactive prompt example
process.stdout.write('What is your name? ');
process.stdin.once('data', (data) => {
  const name = data.toString().trim();
  process.stdout.write(`Hello, ${name}!\n`);
  process.exit();
});
*/
