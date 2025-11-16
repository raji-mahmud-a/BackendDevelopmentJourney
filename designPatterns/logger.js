

import Logger from "./singletonLogger.js"

const logger1 = new Logger();
logger1.log("Second Log");

const logger2 = new Logger();
logger2.log("First Log");

console.log(logger1.getLogs());
console.log(logger1 === logger2);
