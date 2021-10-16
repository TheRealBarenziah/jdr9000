const evaluate = require("../utils/lisp");
const prefix = require("../utils/prefix");

module.exports = {
  name: "lisp",
  description: `Exec some lisp. May also be passed a lisp blockcode. Uses \`lips.js\`: google \`npm lips\` for more infos.
Example: \`${prefix + "lisp (+ 1 2 3)"}\``,
  async execute(msg, args) {
    await evaluate(msg, args);
    return null;
  },
};
