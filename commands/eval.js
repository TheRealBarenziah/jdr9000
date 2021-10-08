const evaluate = require("../utils/eval");

module.exports = {
  name: "eval",
  description: "The nasty 'global.eval()' function in all its glory. Pass code as argument and watch the world burn.\nAccepts a single '-p' (public mode) flag BEFORE the code.",
  execute(msg, args) {
    evaluate(msg, args);
    return null;
  },
};
