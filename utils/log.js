// https://www.kindacode.com/article/node-js-colorizing-console-log-output/
module.exports = {
  blue: (output) => console.log("\x1b[34m%s\x1b[0m", output),
  cyan: (output) => console.log("\x1b[36m%s\x1b[0m", output),
  green: (output) => console.log("\x1b[32m%s\x1b[0m", output),
  magenta: (output) => console.log("\x1b[35m%s\x1b[0m", output),
  red: (output) => console.log("\x1b[31m%s\x1b[0m", output),
  yellow: (output) => console.log("\x1b[33m%s\x1b[0m", output),
};