const fs = require('fs');
const path = require('path');

function loadEnv(filePath) {
  try {
    const envFile = fs.readFileSync(path.resolve(filePath), 'utf-8');
    envFile.split('\n').forEach(line => {
      
      if (!line.trim() || line.startsWith('#')) return;

      const [key, ...valueArr] = line.split('=');
      const value = valueArr.join('=').trim().replace(/"/g, '');

      if (key && value && !process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    });
    console.log('Environment variables loaded manually.');
  } catch (e) {
    console.error('Could not load .env file:', e.message);
  }
}

loadEnv('.env');

console.log(`Running on PORT: ${process.env.PORT}`); //test
