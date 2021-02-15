const roll = require("../utils/roll.js");
const colorizeText = require("../utils/colorizeText.js");
const prefix = require("../utils/prefix");

module.exports = {
  name: "r",
  description: `Default roll100, but even shorter. For non-default behavior please use \`${prefix}roll\``,
  execute(msg, args) {
    if (args.length === 0) {
      msg.reply(" rolling 1d100 :\n" + colorizeText.orange(roll(100).toString()));
      return null;
    }
    else {
      msg.channel.send(`Argument invalid: must be \`${prefix}roll XdY\` where X and Y are numeric values !`);
      return null;
    }
  }
};

