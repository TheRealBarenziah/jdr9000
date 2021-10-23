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
      // let fileOutput = false;
      // if (args.length > 1) {
      //   if (args[0] === "-o") {
      //     args.shift();
      //     fileOutput = true;
      //   }
      // }
      const { stdout, stderr } = await exec(args.join(" "));
      const output = stderr ? `stderr returned something:\n${stderr}\nstdout returned:\n${stdout}` : stdout;
      sendPotentiallyLongOutput({ string: output, msg });
    } catch (error) {
      msg.channel.send("Error while exec'ing:", prettify(error));
    }
  }
  else {
    msg.author.send(support("Seems you aren't allowed to use this command."));
  }
  return null;
};