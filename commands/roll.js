const roll = require("../utils/roll.js");
const colorizeText = require("../utils/colorizeText.js");
const isNumeric = require("../utils/isNumeric.js");
const prefix = require("../utils/prefix");


module.exports = {
  name: "roll",
  description: `Takes an argument \`${prefix}roll XdY\` where X is the number of dices you want, & Y the number of faces for the dices.`,
  execute(msg, args) {
    if (args.length === 1 && ( Number(args[0]) <= 100 && Number(args[0]) >= 0)) {
      msg.reply(` rolling 1d${args[0]} :\n` + colorizeText.orange(roll(args[0]).toString()));
      return null;
    }
    const parsedArg = args[0].split("d");
    if (parsedArg.length !== 2) {
      msg.channel.send(`Argument format invalid: must be \`${prefix}roll XdY\` where X is the number of dices & Y the number of faces for each dice !`);
      return null;
    }
    else {
      let diceQty = parsedArg[0];
      let diceSize = parsedArg[1];
      if ((isNumeric(diceQty)) && (isNumeric(diceSize))) {
        if ( ( Number(diceQty) <= 100) && ( Number(diceSize) <= 1000) ){
          // lets be safe with user input Q_Q..

          const results = [];
          for (let i = 0; i < diceQty; i++) {
            results.push(roll(diceSize));
          }
          const sum = results.reduce((a, b) => a + b, 0);

          msg.reply(" rolling " + diceQty + "d" + diceSize + ":\n" + colorizeText.orange(results.toString() + `\nTotal: ${sum}`));
        }
        else {
          msg.channel.send(`Argument invalid: must be \`${prefix}roll XdY\` where X is maximum 100 & Y is maximum 1000 !`);
          return null;
        }
      }
      else {
        msg.channel.send(`Argument invalid: must be \`${prefix}roll XdY\` where X and Y are numeric values !`);
        return null;
      }
    }
    return null;
  },
};
