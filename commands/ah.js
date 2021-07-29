const ah = require("../utils/ah");

module.exports = {
  name: "ah",
  description: "Invoke the spirit of Denis Brogniart.",
  execute(msg) {
    ah(msg);
  },
};
