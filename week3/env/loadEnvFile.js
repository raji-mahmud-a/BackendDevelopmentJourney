




const { loadEnvFile } = require('node:process');

loadEnvFile();

console.log(process.env.PORT);
