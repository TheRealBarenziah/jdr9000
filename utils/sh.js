const util = require("util");
const exec = util.promisify(require("child_process").exec);
const isAuthorPoweruser = require("./isAuthorPoweruser");
const support = require("./supportAssistance");
const clg = require("./log").cyan;
const prettify = require("./format").bash;
const sendPotentiallyLongOutput = require("./sendPotentiallyLongOutput");

module.exports = async (msg, args) => {
  clg(`msg.author.id of 'sh' caller: ${msg.author.id}`);
  if (isAuthorPoweruser(msg)) {
    try {
      const result = await exec(args.join(" "))
        .catch(e => {
          console.error("catch error in exec: ", e);
          sendPotentiallyLongOutput({ string: String(e), msg, styleCb: (x) => prettify(x) });
        });
      if (result) {
        sendPotentiallyLongOutput({ string: result, msg, styleCb: (x) => prettify(x) });
      }
    } catch (error) {
      msg.channel.send("Error while exec'ing:", prettify(error));
    }
  }
  else {
    msg.author.send(support("Seems you aren't allowed to use this command."));
  }
  return null;
};